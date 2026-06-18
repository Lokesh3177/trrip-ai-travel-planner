import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaFilePdf, FaSpinner, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentProcessingFile, setCurrentProcessingFile] = useState("");

  const handleFileChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(file =>
      file.type === "application/pdf" || file.type.startsWith("image/")
    );

    if (validFiles.length !== selectedFiles.length) {
      setErrorMessage("System restriction: Only booking PDFs or image receipts are supported.");
    }

    setFiles(validFiles);
  };

  const handleUploadSubmit = async (e) => {
  e.preventDefault();

  if (files.length === 0) {
    setErrorMessage("Please stage at least one document vector node to ingest.");
    return;
  }

  setIsProcessing(true);
  setErrorMessage("");
  setSuccessMessage("");

  let processingFailed = false;

  for (let i = 0; i < files.length; i++) {
    const currentFile = files[i];
    setCurrentProcessingFile(currentFile.name);

    const formData = new FormData();
    formData.append("document", currentFile);

    try {
      await api.post("/itineraries/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (files.length > 1 && i < files.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(
        `Ingestion Error Stack for ${currentFile.name}:`,
        error
      );

      processingFailed = true;

      const errorString =
        error.response?.data?.message ||
        error.message ||
        "";

      if (
        error.response?.status === 429 ||
        errorString.includes("429") ||
        errorString.toLowerCase().includes("quota")
      ) {
        setErrorMessage(
          `AI Engine Quota Exceeded (429) at file: "${currentFile.name}". Please wait 60 seconds before trying remaining queue.`
        );
      } else {
        setErrorMessage(
          `Error parsing "${currentFile.name}": ${
            error.response?.data?.message ||
            "Internal network failure."
          }`
        );
      }

      break;
    }
  }

  setIsProcessing(false);
  setCurrentProcessingFile("");

  if (!processingFailed) {
    setSuccessMessage(
      "Document structural logs compiled and indexed successfully!"
    );

    setFiles([]);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }
};

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#333A4A] font-sans antialiased">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-10 shadow-sm space-y-6">

          <div>
            <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-[#1A2B5F]/10 text-[#1A2B5F] px-2.5 py-1 rounded-md">
              Data Ingestion Port
            </span>
            <h1 className="text-2xl font-black text-[#1A2B5F] uppercase tracking-tight mt-3">
              Upload Travel Vectors
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Drop your booking confirmations, ticket receipts, or boarding vouchers here. Our integrated Gemini model parses flat text strings into clean operational parameters.
            </p>
          </div>

          {/* SYSTEM MESSAGES */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-bold flex items-center gap-3 font-mono uppercase tracking-wide">
              <FaTimesCircle className="text-base flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-xs font-bold flex items-center gap-3 font-mono uppercase tracking-wide">
              <FaCheckCircle className="text-base flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-6">

            {/* DRAG & DROP AREA */}
            <div className="relative border-2 border-dashed border-gray-200 hover:border-[#B8961E] bg-[#F5F7FA]/50 rounded-2xl p-8 text-center transition-all group">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                disabled={isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                accept="application/pdf,image/*"
              />
              <FaCloudUploadAlt className="text-4xl text-gray-300 group-hover:text-[#B8961E] mx-auto transition-colors" />
              <p className="text-xs font-bold text-[#1A2B5F] uppercase tracking-wider mt-3">
                Drag documents here or <span className="text-[#B8961E] underline">browse local storage</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">PDF, PNG, JPG up to 10MB</p>
            </div>

            {/* STAGED FILES QUEUE */}
            {files.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Staged Manifest Buffer Queue ({files.length})</span>
                <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-xl divide-y bg-white">
                  {files.map((file, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FaFilePdf className="text-red-500 flex-shrink-0" />
                        <span className="text-gray-600 font-bold truncate max-w-[400px]">{file.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBMIT VECTOR CONTROL */}
            <button
              type="submit"
              disabled={isProcessing || files.length === 0}
              className="w-full bg-[#1A2B5F] text-white disabled:bg-gray-200 disabled:text-gray-400 font-black text-xs uppercase tracking-wider py-4 rounded-xl transition shadow-lg shadow-[#1A2B5F]/10 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Parsing: {currentProcessingFile || "Matrix Engine"}...</span>
                </>
              ) : (
                "Execute Ingestion Pipeline"
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Upload;