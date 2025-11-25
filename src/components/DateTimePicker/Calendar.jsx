import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthNames, dayNames, getDaysInMonth, isPastDate, isSameDay } from "./utils";

export default function Calendar({ currentMonth, tempDate, onPrev, onNext, onSelect }) {

  const days = getDaysInMonth(currentMonth);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onPrev} className="p-2 hover:bg-gray-800 rounded-lg">
          <ChevronLeft size={20} />
        </button>

        <h3 className="text-xl font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button onClick={onNext} className="p-2 hover:bg-gray-800 rounded-lg">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((d, i) => {
          const isSelected = isSameDay(d.date, tempDate);
          const past = isPastDate(d.date);

          return (
            <button
              key={i}
              disabled={past}
              onClick={() => onSelect(d.date)}
              className={`
                aspect-square flex items-center justify-center rounded-full
                text-sm
                ${!d.isCurrentMonth ? "text-gray-600" : "text-white"}
                ${isSelected ? "bg-teal-500 text-white" : "hover:bg-gray-800"}
                ${past ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
