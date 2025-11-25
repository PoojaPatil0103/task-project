import React, { useState, useRef } from "react";
import Input from "./Input";
import FilePreview from "./FilePreview";
import DocumentCard from "./DocumentCard";

export default function MultiDocumentUpload() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const addFiles = (files) => setUploadedFiles((p) => [...p, ...files]);

  // helper to normalize FileList to Array<File>
  const handleFiles = (files) => {
    const arr = Array.from(files).filter(Boolean);
    if (arr.length) addFiles(arr);
    setIsDragging(false);
  };

  // Called when user clicks "Browse"
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dtFiles = e.dataTransfer?.files;
    if (dtFiles && dtFiles.length) {
      handleFiles(dtFiles);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // show visual cue
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const addDocument = () => {
    if (!documentTitle.trim() || uploadedFiles.length === 0) return;

    setSubmittedDocuments((prev) => [
      ...prev,
      { id: Date.now(), title: documentTitle, files: uploadedFiles },
    ]);

    setDocumentTitle("");
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Documents</h2>

          <Input
            label="Document Title"
            value={documentTitle}
            onChange={setDocumentTitle}
            placeholder="Enter document title"
            required
          />

          {/* Inline Drag & Drop Area */}
          <div className="mt-4 flex items-center gap-4">
            {/* Browse button (medium) + file count */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
                aria-label="Browse files"
              >
                Browse
              </button>
            </div>

            {/* Drop area (medium height, fills remaining space) */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragEnter={onDragOver}
              onDragLeave={onDragLeave}
              className={`flex-1 border-2 ${
                isDragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-dashed border-gray-300 bg-white"
              } rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer min-h-[96px]`}
              onClick={openFileDialog}
            >
              <div className="flex items-center gap-4">
                {/* larger, clearer icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4 4 4 0 00-4-4H7l.5-1A4 4 0 0111 6h1"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v6m0 0l-2-2m2 2l2-2"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Drag & drop files here
                  </p>
                </div>
              </div>

              {/* hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onInputChange}
                className="hidden"
              />
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              {uploadedFiles.map((f, i) => (
                <FilePreview
                  key={i}
                  file={f}
                  onRemove={() =>
                    setUploadedFiles((p) => p.filter((_, index) => index !== i))
                  }
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => {
                setDocumentTitle("");
                setUploadedFiles([]);
              }}
              className="px-6 py-2.5 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={addDocument}
              disabled={!documentTitle.trim() || uploadedFiles.length === 0}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg disabled:opacity-50"
            >
              Add Document
            </button>
          </div>
        </div>

        {/* Submitted List */}
        {submittedDocuments.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Submitted Documents
            </h2>

            <div className="space-y-3">
              {submittedDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onRemove={() =>
                    setSubmittedDocuments((p) => p.filter((d) => d.id !== doc.id))
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
