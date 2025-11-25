import React, { useState } from 'react';
import { CheckCircle, Wand2, Loader2 } from 'lucide-react';

export default function FormValidator({ initialData = { name: '', email: '', phone: '', age: '' }, onApply }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const validate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate processing

    const nameCorrected = formData.name.trim().split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
    const emailNormalized = formData.email.toLowerCase().trim();
    const phoneDigits = formData.phone.replace(/\D/g, '').slice(0, 10);
    const ageNum = Number(formData.age) || 0;

    const validations = {
      name: {
        valid: nameCorrected.length >= 2,
        suggestion: nameCorrected.length >= 2 ? '✓ Valid name' : 'Name should be at least 2 characters',
        corrected: nameCorrected
      },
      email: {
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized),
        suggestion: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized) ? '✓ Valid email' : 'Please provide a valid email',
        corrected: emailNormalized
      },
      phone: {
        valid: /^\d{10}$/.test(phoneDigits),
        suggestion: /^\d{10}$/.test(phoneDigits) ? '✓ Valid phone' : 'Phone should be 10 digits',
        corrected: phoneDigits
      },
      age: {
        valid: ageNum >= 1 && ageNum <= 120,
        suggestion: ageNum >= 1 && ageNum <= 120 ? '✓ Valid age' : 'Age must be between 1 and 120',
        corrected: Math.max(1, Math.min(120, ageNum || 1))
      }
    };

    setResults(validations);
    setLoading(false);
  };

  const applyCorrections = () => {
    if (!results) return;
    const corrected = {
      name: results.name.corrected,
      email: results.email.corrected,
      phone: results.phone.corrected,
      age: String(results.age.corrected)
    };
    setFormData(corrected);
    onApply?.(corrected);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-green-50">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" /> Form Validator
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="p-3 border rounded-lg" />
        <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="p-3 border rounded-lg" />
        <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" className="p-3 border rounded-lg" />
        <input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="Age" className="p-3 border rounded-lg" />
      </div>

      <div className="flex gap-3">
        <button onClick={validate} disabled={loading} className={`px-4 py-2 rounded-lg font-semibold ${loading ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'}`}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />} Validate
        </button>

        {results && !Object.values(results).every(v => v.valid) && (
          <button onClick={applyCorrections} className="px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> Apply Corrections
          </button>
        )}
      </div>

      {results && (
        <div className="mt-4 space-y-2">
          {Object.entries(results).map(([k, v]) => (
            <div key={k} className={`p-3 rounded-lg ${v.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium capitalize">{k}</p>
                  <p className="text-sm text-gray-700">{v.suggestion}</p>
                  {!v.valid && <p className="text-xs text-gray-500">Suggested: <span className="font-medium">{v.corrected}</span></p>}
                </div>
                <div className="text-sm">{v.valid ? '✅' : '❌'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
