import React, { useState, useEffect } from "react";
import { Trash2, FileText, File, Image } from "lucide-react";

export default function FilePreview({ file, onRemove }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const getFileIcon = () => {
    if (file.type.startsWith("image/"))
      return <Image size={20} className="text-blue-500" />;
    if (file.type.includes("pdf"))
      return <FileText size={20} className="text-red-500" />;
    return <File size={20} className="text-gray-500" />;
  };

  const formatFileSize = (b) =>
    b < 1024 ? b + " B" : b < 1024 * 1024 ? (b / 1024).toFixed(1) + " KB" : (b / 1024 / 1024).toFixed(1) + " MB";

  return (
    <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div>
        {preview ? (
          <img src={preview} alt={file.name} className="w-12 h-12 rounded object-cover" />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
            {getFileIcon()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">{file.name}</p>
        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
      </div>

      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
