import { ChevronUp, ChevronDown } from "lucide-react";

export default function TimePicker({ tempDate, onHourChange, onMinuteChange, onTogglePeriod }) {

  const get12Hour = () => {
    const h = tempDate.getHours();
    return h % 12 || 12;
  };

  const getPeriod = () => (tempDate.getHours() >= 12 ? "PM" : "AM");

  return (
    <div className="flex items-center justify-center gap-4 mb-8">

      {/* Hours */}
      <div className="flex flex-col items-center">
        <button onClick={() => onHourChange(true)} className="p-1 hover:bg-gray-800 rounded">
          <ChevronUp size={20} />
        </button>

        <div className="bg-white text-black w-16 h-16 text-2xl font-bold flex items-center justify-center rounded-lg my-2">
          {String(get12Hour()).padStart(2, "0")}
        </div>

        <button onClick={() => onHourChange(false)} className="p-1 hover:bg-gray-800 rounded">
          <ChevronDown size={20} />
        </button>
      </div>

      <span className="text-2xl font-bold mb-8">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <button onClick={() => onMinuteChange(true)} className="p-1 hover:bg-gray-800 rounded">
          <ChevronUp size={20} />
        </button>

        <div className="bg-white text-black w-16 h-16 text-2xl font-bold flex items-center justify-center rounded-lg my-2">
          {String(tempDate.getMinutes()).padStart(2, "0")}
        </div>

        <button onClick={() => onMinuteChange(false)} className="p-1 hover:bg-gray-800 rounded">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* AM PM */}
      <button
        onClick={onTogglePeriod}
        className="w-16 h-16 border-2 border-white rounded-lg text-xl font-bold flex items-center justify-center hover:bg-gray-800"
      >
        {getPeriod()}
      </button>
    </div>
  );
}
