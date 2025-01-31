import React, { useEffect, useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Footer from "../Footer/Footer";
import LandingPage from "./LandingPage";
import { useParams } from "react-router-dom";
import DownloadCard from "../DownloadCard";
function GetStarted() {
  const { uuid } = useParams();
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  useEffect(() => {
    if (uuid) {
      setShowDownloadCard(true);
    }
  }, [uuid]);
  return (
    <>
      <div>
        <div className="">
         <div className="relative">
          {showDownloadCard && <DownloadCard fileId={uuid} />}
          <LandingPage />
         </div>

          <Page2 />
          <Page3 />
          <Footer />
        </div>
      </div>
    </>
  );
}
export default GetStarted;
