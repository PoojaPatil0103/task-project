import React from "react";
import { FileText, Trash2 } from "lucide-react";

export default function DocumentCard({ doc, onRemove }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-gray-600" />
        <div>
          <p className="font-bold text-gray-900">{doc.title}</p>
          <p className="text-sm text-gray-500">{doc.files.length} files attached</p>
        </div>
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
