import React, { useState } from "react";
import { Sparkles, Loader2, Download } from "lucide-react";

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);

    try {
      const encoded = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true`;

      // Simulate 2 sec delay (UI effect)
      await new Promise((res) => setTimeout(res, 2000));

      setImageUrl(url);
    } catch (err) {
      alert("Image generation failed! Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-purple-500" />
        AI Image Generator
      </h2>

      {/* Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe an image… e.g., A cyberpunk girl standing in neon lights"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        rows="3"
      />

      {/* Button */}
      <button
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
          loading || !prompt.trim()
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Generating…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" /> Generate Image
          </>
        )}
      </button>

      {/* Output Image */}
      {imageUrl && (
        <div className="mt-6">
          <div className="rounded-xl overflow-hidden border-4 border-purple-200 shadow-lg">
            <img
              src={imageUrl}
              alt="AI Generated"
              className="w-full h-auto"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/512?text=Image+Not+Available";
              }}
            />
          </div>

          <a
            href={imageUrl}
            download="ai-image.png"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 mt-4 rounded-lg font-semibold"
          >
            <Download className="w-5 h-5" /> Download Image
          </a>
        </div>
      )}
    </div>
  );
}
