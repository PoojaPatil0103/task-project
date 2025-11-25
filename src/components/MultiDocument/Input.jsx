import React from "react";

export default function Input({ label, value, onChange, placeholder, required }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                   focus:border-teal-500 focus:ring-2 focus:ring-teal-100 
                   outline-none transition-all"
      />
    </div>
  );
}
