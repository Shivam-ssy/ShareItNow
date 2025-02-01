import React from "react";
import { useState } from "react";
function DirectShare() {
  const [roomID, setRoomID] = useState(null);
  const [pageChange, setPageChange] = useState("0");
  const [catalog,setCatalog]=useState("0")
  const [dNone, setDisplay] = useState(true);
  const [sender,setSender]=useState(false)
  
  const roomIdGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
  };
  const handleSend = () => {
    const d = "1";
    setPageChange(d);
    setCatalog(d);
    setDisplay(false);
    setPageChange((prevPageChange) => {
      setCatalog((prevCatalog) => {
        if (prevPageChange === "1" && prevCatalog === "1") {
          setSender(true);
          console.log(true); // Expected output: true
        } else {
          console.log(prevCatalog); // Expected output: "1"
        }
      });
      return d;
    });
  };
  const handleRecieve = () => {
    const d = "2";
    setPageChange(d);
    setCatalog(d);
    setDisplay(false);
    setPageChange((prevPageChange) => {
      setCatalog((prevCatalog) => {
        if (prevPageChange === "2" && prevCatalog === "2") {
          setSender(true);
          console.log(true); // Expected output: true
        } else {
          console.log(prevCatalog); // Expected output: "1"
        }
      });
      return d;
    });
  };
  return (
    <>
      <div className="w-full min-h-[calc(100vh-80px)]  bg-[url('/background.jpg')] bg-center bg-contain">
        {
            dNone &&  <div
            className={`w-full h-screen flex  justify-center gap-10 items-center`}
          >
            <div
              onClick={() =>{ handleSend()}}
              className="w-52 h-52 rounded-full  bg-cyan-600 cursor-pointer hover:scale-90 hover:shadow shadow-xl shadow-green-400 text-green-100  font-bold text-3xl flex justify-center items-center "
            >
              Send File
            </div>
            <div
              onClick={() => handleRecieve()}
              className="w-52 h-52 rounded-full  bg-red-400 cursor-pointer text-white  hover:scale-90 hover:shadow shadow-xl shadow-orange-400  font-bold text-3xl flex justify-center items-center"
            >
              Recieve file
            </div>
          </div>
        }
        {
           sender && 
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 h-1/2 bg-white">
              
            </div>
        </div>
           
        }
      </div>
    </>
  );
}
export default DirectShare;
