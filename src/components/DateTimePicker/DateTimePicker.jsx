import React, { useState } from "react";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import QuickRanges from "./QuickRanges";

export default function DateTimePicker() {

  const [isOpen, setIsOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());

  const formatDateTime = (date) => {
    const d = String(date.getDate()).padStart(2,"0");
    const m = String(date.getMonth()+1).padStart(2,"0");
    const y = date.getFullYear();
    const h = String(date.getHours() % 12 || 12).padStart(2,"0");
    const min = String(date.getMinutes()).padStart(2,"0");
    const p = date.getHours() >= 12 ? "pm" : "am";
    return `${d}/${m}/${y}, ${h}:${min} ${p}`;
  };

  const handleDateSelect = (date) => {
    const nd = new Date(tempDate);
    nd.setFullYear(date.getFullYear());
    nd.setMonth(date.getMonth());
    nd.setDate(date.getDate());
    setTempDate(nd);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left mb-2">
          {formatDateTime(selectedDate)}
        </button>

        {isOpen && (
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-6">

            {/* Quick Ranges */}
            <QuickRanges
              setQuickRange={(range) => {
                const now = new Date();
                let d = new Date(now);

                if (range === "today") d = new Date();
                if (range === "last7days") d = new Date(now.setDate(now.getDate() - 7));
                if (range === "thisMonth") d = new Date(now.getFullYear(), now.getMonth(), 1);

                setTempDate(d);
                setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
              }}
            />

            {/* Calendar */}
            <Calendar
              currentMonth={currentMonth}
              tempDate={tempDate}
              onPrev={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              onNext={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              onSelect={handleDateSelect}
            />

            {/* Time Picker */}
            <TimePicker
              tempDate={tempDate}
              onHourChange={(inc) => {
                const d = new Date(tempDate);
                d.setHours((d.getHours() + (inc ? 1 : -1) + 24) % 24);
                setTempDate(d);
              }}
              onMinuteChange={(inc) => {
                const d = new Date(tempDate);
                d.setMinutes((d.getMinutes() + (inc ? 1 : -1) + 60) % 60);
                setTempDate(d);
              }}
              onTogglePeriod={() => {
                const d = new Date(tempDate);
                d.setHours((d.getHours() + 12) % 24);
                setTempDate(d);
              }}
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button onClick={() => { setTempDate(selectedDate); setIsOpen(false); }} className="text-lg hover:text-gray-300">
                Cancel
              </button>
              <button onClick={() => { setSelectedDate(tempDate); setIsOpen(false); }} className="text-lg hover:text-gray-300">
                Set
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
