import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function MultiSelectDropdown() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Simulate async option loading
  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOptions([
        { id: 1, label: 'Office Space' },
        { id: 2, label: 'Plot' },
        { id: 3, label: 'Apartment' },
        { id: 4, label: 'Villa' },
        { id: 5, label: 'Commercial Building' },
        { id: 6, label: 'Warehouse' },
        { id: 7, label: 'Retail Space' },
        { id: 8, label: 'Industrial Land' }
      ]);
      setLoading(false);
    };
    loadOptions();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selected.find(s => s.id === option.id)
  );

  const handleSelect = (option) => {
    setSelected([...selected, option]);
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleRemove = (id) => {
    setSelected(selected.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchTerm === '' && selected.length > 0) {
      handleRemove(selected[selected.length - 1].id);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(filteredOptions[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            2. Dropdown / Select Widget
          </h1>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Sub-Type <span className="text-red-500">*</span>
            </label>
            
            <div ref={dropdownRef} className="relative">
              <div
                className={`min-h-[56px] w-full px-3 py-2 border-2 rounded-lg bg-white cursor-text flex flex-wrap gap-2 items-center transition-all ${
                  isOpen ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-emerald-400 hover:border-emerald-500'
                }`}
                onClick={() => {
                  setIsOpen(true);
                  inputRef.current?.focus();
                }}
              >
                {selected.map(item => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                  >
                    {item.label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${item.label}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={handleKeyDown}
                  placeholder={selected.length === 0 ? 'Search or select...' : ''}
                  className="flex-1 min-w-[120px] outline-none text-gray-700 placeholder-gray-400"
                  aria-label="Search property types"
                />
                
                <div className="flex items-center gap-2 ml-auto">
                  {selected.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearAll();
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear all selections"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500 mx-auto"></div>
                      <p className="mt-2 text-sm">Loading options...</p>
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      {searchTerm ? 'No options found' : 'All options selected'}
                    </div>
                  ) : (
                    filteredOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option)}
                        className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors text-gray-700 border-b last:border-b-0 border-gray-100"
                      >
                        {option.label}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {selected.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
            >
              CLEAR ALL
            </button>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Selected Items:</h3>
            <p className="text-gray-600 text-sm">
              {selected.length === 0 
                ? 'No items selected' 
                : selected.map(s => s.label).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}