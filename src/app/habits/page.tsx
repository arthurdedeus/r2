"use client";

import React, { useState, useMemo } from "react";
import { MonthSelector } from "./components/month-selector";
import { WeekNavigation } from "./components/week-navigation";
import { HabitsTable } from "./components/habits-table";

export default function HabitTracker() {
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [year, month],
  );

  const weeksInMonth = Math.ceil(daysInMonth / 7);

  const changeWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      if (direction === "prev") {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(weeksInMonth - 1, prev + 1);
      }
    });
  };

  const updateMonthYear = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
    setCurrentWeek(0);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f5f3eb]">
      <div className="max-w-full md:max-w-[1200px] mx-auto">
        <MonthSelector month={month} year={year} onChange={updateMonthYear} />
        <WeekNavigation
          currentWeek={currentWeek}
          weeksInMonth={weeksInMonth}
          changeWeek={changeWeek}
        />
        <HabitsTable
          currentWeek={currentWeek}
          daysInMonth={daysInMonth}
          month={month}
          year={year}
        />
      </div>
    </div>
  );
}
