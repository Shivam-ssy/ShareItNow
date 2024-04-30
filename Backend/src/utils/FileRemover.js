import { Users } from "../models/UserModule.models.js"
import cron from 'node-cron';
import { deleteFileFromCloudinary } from "./cloudinary.js";
async function removeOldFiles() {
    const users = await Users.find({"files.sharedAt": {$lte: new Date(Date.now() - 24*60*60*1000)}});
  
    const deletionPromises = users.map(user => {
        const filesToDelete = user.files.filter(file => new Date(file.sharedAt) <= new Date(Date.now() - 24*60*60*1000));

        // Delete each file from Cloudinary
        const cloudinaryDeletions = filesToDelete.map(file => deleteFileFromCloudinary(file.fileurl));

        // Once all Cloudinary deletions are done, update the user's files array
        return Promise.all(cloudinaryDeletions).then(() => {
            user.files = user.files.filter(file => new Date(file.sharedAt) > new Date(Date.now() - 24*60*60*1000));
            return user.save();
        });
    });

    await Promise.all(deletionPromises);
    console.log('Old files removed from DB and Cloudinary');
    console.log('Old files removed');
  }
  
  // Schedule the job to run at 1am every day Indian Standard Time
  async function initialize() {
    console.log('Checking for files to remove...');
    await removeOldFiles(); // Run immediately on server start
    setupCronJob();
  }
  
  function setupCronJob() {
    // Set up the cron job to run daily at 1 AM IST
    cron.schedule('0 1 * * *', removeOldFiles, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
    console.log('Cron job scheduled to run at 1 AM IST.');
  }
  export {initialize}