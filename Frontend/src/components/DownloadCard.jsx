import React, { useEffect, useState } from "react";
import { Download, File, MessageSquare, Loader2 } from "lucide-react";
import config from "../../Conf/cofig";
import axios from "axios";
import { Link } from "react-router-dom";

const DownloadCard = ({ fileId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.downloadUrl}/${fileId}`);
        setFile(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getFile();
  }, [fileId]);

  // Convert bytes to readable format
  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (type) => {
    return <File className="w-12 h-12 text-gray-600" />;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle download
  const handleDownload = async () => {
    try {
        const url = file.fileurl;
        // console.log(file)
        const response = await fetch(url);
        const blob = await response.blob();

        // Create a temporary link element
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = file.filename;
        a.style.display = 'none';

        // Append the link to the body and trigger the download
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full absolute max-w-2xl bg-white rounded-xl shadow-lg flex justify-center items-center p-6">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full absolute  max-w-2xl bg-white rounded-xl shadow-lg p-6 text-red-600">
        Error loading file details: {error.message}
      </div>
    );
  }

  if (!file) {
    return null;
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] absolute flex items-center justify-center z-30 rounded-xl  p">

    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-[#ce3f21] p-4">
        <div className="flex justify-between"><span className="text-white text-lg font-semibold">Download File</span> <Link className="text-blue-400 " to="/">Go Home</Link></div>
      </div>

      <div className="p-6">
        {/* File Info Section */}
        <div className="flex items-start gap-4 mb-6">
          {getFileIcon(file.fileType)}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {file.filename}
            </h3>
            <p className="text-gray-500 text-sm">
              {formatFileSize(file.fileSize)}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-[#ce3f21] text-white rounded-lg hover:bg-[#ce3f21]/80 transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>

        {/* File Details Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">File Type</p>
              <p className="font-medium uppercase">{file.fileType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Shared At</p>
              <p className="font-medium">{formatDate(file.sharedAt)}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>File ID: {file.fileId}</span>
            <span>Secure download</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DownloadCard;
