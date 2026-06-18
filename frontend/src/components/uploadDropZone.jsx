import { useCallback } from "react";
import { useDropzone } from "react-react-dropzone";
import { useDropzone as useReactDropzone } from "react-dropzone"; // Fallback import naming mapping
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaImage,
  FaTrash,
  FaShieldAlt,
  FaInfoCircle
} from "react-icons/fa";

function UploadDropzone({ files, setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useReactDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      {/* NEW INTERIOR INDUSTRIAL BOX DESIGN */}
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden
          border border-dashed rounded-xl
          p-6 transition-all duration-200 cursor-pointer
          ${
            isDragActive
              ? "border-[#B8961E] bg-[#B8961E]/5"
              : "border-gray-200 bg-[#F5F7FA]/40 hover:bg-[#F5F7FA] hover:border-[#1A2B5F]"
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Dynamic Highlight Accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all ${isDragActive ? 'bg-[#B8961E]' : 'bg-transparent'}`} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* LEFT CONTENT: Compact CTA Vector */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className={`p-3.5 rounded-xl border transition-all ${
              isDragActive ? 'bg-white text-[#B8961E] border-[#B8961E]/30' : 'bg-white text-[#1A2B5F] border-gray-100 shadow-sm'
            }`}>
              <FaCloudUploadAlt size={22} className={isDragActive ? "animate-bounce" : ""} />
            </div>
            
            <div>
              <h3 className="text-sm font-black text-[#1A2B5F] tracking-tight uppercase">
                {isDragActive ? "Drop System Layer Here" : "Ingest Document Assets"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Drag & drop files or <span className="text-[#B8961E] font-bold underline">browse local drive</span>
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT: NEW INTEGRATED COMPLIANCE CONTENT BADGES */}
          <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 w-full md:w-auto justify-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide text-[#333A4A] bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-2xs">
              <FaShieldAlt className="text-[#B8961E]" /> Secure SSL Parse
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <FaInfoCircle /> MAX 15MB • PDF, JPG, PNG
            </div>
          </div>

        </div>
      </div>

      {/* SELECTED FILES TRACKING LAYOUT */}
      {files.length > 0 && (
        <div className="border border-gray-100 rounded-xl bg-white p-4 shadow-sm animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A2B5F] font-mono">
              Staged Ingestion Queue
            </h4>
            <span className="bg-[#1A2B5F] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              {files.length} Units
            </span>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#F5F7FA] border border-gray-100 rounded-lg p-2.5 transition-colors hover:border-gray-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {file.type === "application/pdf" ? (
                    <FaFilePdf className="text-red-500 text-xs flex-shrink-0" />
                  ) : (
                    <FaImage className="text-blue-500 text-xs flex-shrink-0" />
                  )}

                  <div className="truncate">
                    <p className="text-xs font-bold text-[#333A4A] truncate font-mono max-w-[240px] sm:max-w-[450px]">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-600 p-1.5 rounded transition-colors"
                  title="Remove asset"
                >
                  <FaTrash size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadDropzone;