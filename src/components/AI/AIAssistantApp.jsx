import React, { useState } from 'react';
import { Image, MessageSquare, FileCheck } from 'lucide-react';
import AIGenerator from './AIGenerator';
import FormValidator from './FormValidator';

export default function AIAssistantApp() {
  const [tab, setTab] = useState('image');
  const [chatHistory, setChatHistory] = useState([]);
  const [aiResult, setAiResult] = useState(null);

  // Simple Q&A (demo fallback)
  const askQuestion = async (question) => {
    if (!question?.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', content: question }]);

    // demo fallback answer
    const lower = question.toLowerCase();
    let answer = "I'm here to help — please try rephrasing if needed.";
    if (lower.includes('hello')) answer = 'Hello! How can I help?';
    if (lower.includes('how are you')) answer = "I'm an AI demo, ready to assist!";
    setChatHistory(prev => [...prev, { role: 'assistant', content: answer }]);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 mb-6 border shadow-sm">
        <div className="flex gap-3 mb-4">
          <button onClick={() => setTab('image')} className={`px-4 py-2 rounded-lg ${tab === 'image' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-100'}`}>
            <Image className="w-4 h-4 inline-block mr-2" /> Image
          </button>
          <button onClick={() => setTab('qa')} className={`px-4 py-2 rounded-lg ${tab === 'qa' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-100'}`}>
            <MessageSquare className="w-4 h-4 inline-block mr-2" /> Q&A
          </button>
          <button onClick={() => setTab('validation')} className={`px-4 py-2 rounded-lg ${tab === 'validation' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-100'}`}>
            <FileCheck className="w-4 h-4 inline-block mr-2" /> Validation
          </button>
        </div>

        {tab === 'image' && (
          <AIGenerator
            onGenerated={(url) => setAiResult({ type: 'image', url })}
          />
        )}

        {tab === 'qa' && (
          <div>
            <div className="bg-gray-50 p-4 rounded mb-3 min-h-[180px]">
              {chatHistory.length === 0 ? <p className="text-gray-400">No messages yet</p> : chatHistory.map((m, i) => <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : ''}`}><div className={`${m.role === 'user' ? 'inline-block bg-blue-500 text-white px-3 py-2 rounded' : 'inline-block bg-white border px-3 py-2 rounded'}`}>{m.content}</div></div>)}
            </div>
            <QnAInput onSend={askQuestion} />
          </div>
        )}

        {tab === 'validation' && (
          <FormValidator onApply={(data) => setAiResult({ type: 'form', data })} />
        )}
      </div>

      {aiResult && (
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-semibold mb-2">Result</h4>
          {aiResult.type === 'image' && <img src={aiResult.url} alt="result" className="w-full max-h-[320px] object-contain rounded" />}
          {aiResult.type === 'form' && <pre className="text-sm bg-gray-50 p-3 rounded">{JSON.stringify(aiResult.data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}

/* small internal component for Q&A input */
function QnAInput({ onSend }) {
  const [q, setQ] = useState('');
  return (
    <div className="flex gap-2">
      <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { onSend(q); setQ(''); } }} className="flex-1 p-3 border rounded" placeholder="Ask a question..." />
      <button onClick={() => { onSend(q); setQ(''); }} className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
    </div>
  );
}
