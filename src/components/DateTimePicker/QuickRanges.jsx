export default function QuickRanges({ setQuickRange }) {
  return (
    <div className="flex gap-2 mb-4">
      <button onClick={() => setQuickRange("today")} className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
        Today
      </button>

      <button onClick={() => setQuickRange("last7days")} className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
        Last 7 Days
      </button>

      <button onClick={() => setQuickRange("thisMonth")} className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
        This Month
      </button>
    </div>
  );
}
