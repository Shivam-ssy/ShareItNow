import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ProgressBar from "../ProgressBar";
import ResponseCard from "../ResponseCard";
import config from "../../../Conf/cofig";
import DownloadCard from "../DownloadCard";

function LandingPage() {
    const [senderBox, setSenderBox] = useState(false);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [senderEmail, setSenderEmail] = useState("");
    const [recieverEmail, setRecieverEmail] = useState("");
    const [progress, setProgress] = useState(0);
    const [response, setResponse] = useState(null);


    const sendfile = async () => {
        console.log(file);

        if (!file || file.length === 0) {
            toast.warn("Please select a file to upload.");
            return;
        }

        if (file.length > 1 || file[0].size > 100 * 1024 * 1024) {
            toast.warn(`There is more than 1 file or the file size exceeds 100MB (${(file[0].size / (1024 * 1024)).toFixed(2)} MB)`);
            return;
        }

        if (senderEmail === recieverEmail) {
            toast.warn("Please enter different sender and receiver emails.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file[0]);
        formData.append("senderEmail", senderEmail);
        formData.append("recieverEmail", recieverEmail);

        try {
            const res = await axios.post(config.uploadAnyUrl, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                    setProgress(percentComplete);
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            
            setResponse(res.data); 
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setTimeout(() => setProgress(0), 1000); // Reset progress after a delay
        }

        console.log(response);
    };

    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modalOpen = params.get('modal');
        if (modalOpen === 'true') {
            setIsModalOpen(true);
        }
    }, [location]);

    const openModal = () => {
        navigate('?modal=true');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        navigate('?modal=false');
        setIsModalOpen(false);
    };

    return (
        <>
            <ToastContainer className="mt-20" position="top-right" autoClose={5000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="w-full h-auto py-10 md:h-[calc(100vh-80px)] flex flex-col justify-center gap-12 px-5 items-center bg-center bg-cover bg-[url('/image.jpg')]">

                {!senderBox && (
                    <div className="flex flex-col justify-center w-full items-center">
                        <div className="rounded-full w-72 h-72 bg-gray-200 flex justify-center items-center">
                            <i onClick={() => setSenderBox(!senderBox)} className="ri-upload-cloud-fill hover:drop-shadow-none hover:scale-[0.95] ease-in-out hover:cursor-pointer text-red-600 filter drop-shadow-[5px_10px_10px_#000] text-[15rem]"></i>
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold font-serif text-white text-center">Share Your Experience With Us <br /> Drop your file and share</h1>
                        <div className="w-full mt-20 relative">
                            <div className="w-full h-[1px] bg-white absolute"></div>
                            <div className="absolute w-full cursor-pointer flex justify-center">
                                <img style={{ top: '50%', transform: 'translateY(-50%)' }} className="w-10 h-10 bg-white rounded-full p-3 absolute" src="/arrow-down-wide-line.svg" alt="" />
                            </div>
                        </div>
                    </div>
                )}

                {senderBox && !response && (
                    <div className="flex flex-col gap-3 relative bg-[#ce3f21] rounded-xl py-6 px-8">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="h-10 md:w-96 rounded-md px-3" name="Name" id="name" placeholder="Name" />
                        <input value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} type="email" className="h-10 md:w-96 rounded-md px-3" name="senderEmail" id="SenderEmail" placeholder="Sender Email" required />
                        <input value={recieverEmail} onChange={(e) => setRecieverEmail(e.target.value)} type="email" className="h-10 md:w-96 rounded-md px-3" name="reciverEmail" id="RecieverEmail" placeholder="Receiver Email" required />
                        <div>
                            <input onChange={(e) => setFile(e.target.files)} type="file" />
                            <p>(File should be less than 100MB)</p>
                        </div>
                        <textarea name="message" id="" cols="30" rows="10"></textarea>
                        <button onClick={sendfile} className="outline-none text-white hover:bg-gray-800 bg-gray-900 rounded-md py-2 font-thin text-lg" type="submit"> Submit</button>
                        {progress > 0 && (
                            <div>
                                <span>Uploading {progress.toFixed(2)}%</span>
                                <ProgressBar value={progress} />
                            </div>
                        )}
                    </div>
                )}

                {response && <ResponseCard link={`${config.downloadPage}/${response?.data?.uuid || ""}`} />}
            </div>
        </>
    );
}

export default LandingPage;
