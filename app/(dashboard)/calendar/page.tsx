"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { clsx } from "clsx";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(23);
  
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const startOffset = 2; // Starts on Wednesday for example
  const blankDays = Array.from({ length: startOffset }, (_, i) => null);
  const allDays = [...blankDays, ...days];

  const events = [
    { time: "10:00", title: "Fakta Unik Burung Nuri", type: "Awareness • Carousel • Konten edukasi tentang burung nuri.", status: "Uploaded" },
    { time: "10:00", title: "Fakta Unik Burung Nuri", type: "Awareness • Carousel • Konten edukasi tentang burung nuri.", status: "Pending" },
    { time: "10:00", title: "Fakta Unik Burung Nuri", type: "Awareness • Carousel • Konten edukasi tentang burung nuri.", status: "Unuploaded" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-[#1e293b]">Calendar</h1>
          <span className="px-3 py-1 bg-[#ccfbf1] text-[#0f766e] text-xs font-bold rounded-full">TikTok</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-500">
          Jum, 24 Apr 2026
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-[#1e293b]">April 2026</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100 text-gray-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-bold text-[#1e293b] hover:bg-gray-50">
              Hari Ini
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100 text-gray-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"].map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {allDays.map((day, idx) => {
            if (day === null) return <div key={`blank-${idx}`} className="h-24" />;
            
            const isSelected = selectedDate === day;
            const hasDots = day === 18 || day === 20 || day === 22 || day === 23;
            
            return (
              <button 
                key={day}
                onClick={() => setSelectedDate(day)}
                className={clsx(
                  "h-24 p-3 rounded-xl border text-left transition-all flex flex-col justify-between group",
                  isSelected ? "bg-[#ccfbf1]/20 border-[#10b981] ring-1 ring-[#10b981]" : "bg-white border-gray-100 hover:border-[#10b981]/30"
                )}
              >
                <span className={clsx("text-sm font-bold", isSelected ? "text-[#10b981]" : "text-gray-600")}>{day}</span>
                
                {hasDots && (
                  <div className="flex gap-1">
                    {day === 18 && <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />}
                    {day === 20 && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                      </>
                    )}
                    {day === 22 && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      </>
                    )}
                    {day === 23 && (
                      <>
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      </>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-8 border-t border-gray-50 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Uploaded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Unuploaded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#64748b]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Cancelled</span>
          </div>
        </div>
      </div>

      {/* Day Details */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1e293b]">Kamis, 23 April 2026</h3>
          <p className="text-xs text-gray-400 mt-1">4 konten dijadwalkan</p>
        </div>

        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 rounded-2xl border border-gray-50 hover:bg-gray-50/30 transition-all">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-[#1e293b]">{event.time}</span>
                <div>
                  <h4 className="font-bold text-[#1e293b]">{event.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{event.type}</p>
                </div>
              </div>
              <div className={clsx(
                "px-6 py-2 rounded-xl text-xs font-bold border",
                event.status === "Uploaded" && "bg-[#ccfbf1] text-[#0f766e] border-[#0f766e]/10",
                event.status === "Pending" && "bg-[#fef3c7] text-[#92400e] border-[#92400e]/10",
                event.status === "Unuploaded" && "bg-[#fee2e2] text-[#991b1b] border-[#991b1b]/10",
              )}>
                {event.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
