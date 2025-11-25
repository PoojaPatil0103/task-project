import React, { useRef } from "react";
import { Upload } from "lucide-react";

export default function DropZone({ onFilesSelected, isDragging, setIsDragging }) {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesSelected([...e.dataTransfer.files]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <Upload size={48} className={`mx-auto mb-4 ${isDragging ? "text-teal-500" : "text-gray-400"}`} />

      <p className="text-gray-600 font-semibold">Drag and Drop files here</p>
      <p className="text-gray-500 text-sm my-4">OR</p>

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
      >
        Browse
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onFilesSelected([...e.target.files])}
      />
    </div>
  );
}
