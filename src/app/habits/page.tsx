"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const habits = [
  "Creative",
  "Journaling",
  "Gratitude",
  "Reading",
  "Routine",
  "Flow/Focus",
  "Yoga",
  "Suuuuuper long habit name to break the UI",
  "Alignment",
  "Let it in",
];

type Mark = "" | "•" | "X";
type Habit = {
  name: string;
  marks: Mark[];
};

export default function HabitTracker() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [year, month],
  );
  const weeksInMonth = Math.ceil(daysInMonth / 7);

  const [habitList, setHabitList] = useState<Habit[]>(() =>
    habits.map((name) => ({ name, marks: Array(daysInMonth).fill("") })),
  );

  const toggleMark = (habit: Habit, day: number) => {
    const currentMark = habit.marks[day];
    let newMark: Mark;
    if (currentMark === "") {
      newMark = "•";
    } else if (currentMark === "•") {
      newMark = "X";
    } else {
      newMark = "";
    }

    setHabitList((prev) => {
      const newHabitList = [...prev];
      const index = newHabitList.findIndex((h) => h.name === habit.name);
      if (index === -1) return prev;
      newHabitList[index] = {
        ...newHabitList[index],
        marks: [...newHabitList[index].marks],
      };
      newHabitList[index].marks[day] = newMark;
      return newHabitList;
    });
  };

  const isWeekend = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

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
    const newDaysInMonth = new Date(newYear, newMonth, 0).getDate();

    setMonth(newMonth);
    setYear(newYear);
    setHabitList((prev) =>
      prev.map((habit) => ({
        ...habit,
        marks: Array(newDaysInMonth)
          .fill("")
          .map((_, i) => (i < habit.marks.length ? habit.marks[i] : "")),
      })),
    );
    setCurrentWeek(0);
  };

  const mobileGridStyle = {
    gridTemplateColumns: "100px repeat(7, minmax(30px, 1fr))",
  };

  const desktopGridStyle = {
    gridTemplateColumns: `200px repeat(${daysInMonth}, minmax(30px, 1fr))`,
  };

  const getCurrentWeekDays = () => {
    if (window?.innerWidth >= 768) {
      return Array.from({ length: daysInMonth }, (_, i) => i);
    }

    const startDay = currentWeek * 7;
    const days = [];

    // Always push 7 items for mobile view
    for (let i = 0; i < 7; i++) {
      const dayIndex = startDay + i;
      if (dayIndex < daysInMonth) {
        days.push(dayIndex);
      } else {
        days.push(null); // Push null for empty cells
      }
    }

    return days;
  };

  const days = getCurrentWeekDays();

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f5f3eb]">
      <div className="max-w-full md:max-w-[1200px] mx-auto">
        {/* Month and Year selector */}
        <div className="flex items-center gap-4 mb-4">
          <select
            value={month}
            onChange={(e) =>
              updateMonthYear(Number.parseInt(e.target.value), year)
            }
            className="bg-[#f5f3eb] border border-none rounded pr-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) =>
              updateMonthYear(month, Number.parseInt(e.target.value))
            }
            className="bg-[#f5f3eb] border border-none rounded pr-2 py-1"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={2020 + i} value={2020 + i}>
                {2020 + i}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile week navigation */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeWeek("prev")}
            disabled={currentWeek === 0}
            className="px-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <span className="font-medium">Week {currentWeek + 1}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeWeek("next")}
            disabled={currentWeek === weeksInMonth - 1}
            className="px-2"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="overflow-x-auto rounded">
          <div
            className="grid gap-px bg-neutral-200 min-w-full"
            style={
              window?.innerWidth >= 768 ? desktopGridStyle : mobileGridStyle
            }
          >
            {/* Header row with day numbers */}
            <div className="bg-white p-2 font-medium">
              <span className="hidden md:inline">Habit</span>
            </div>
            {days.map((dayIndex, i) => (
              <div
                key={i}
                className={cn(
                  dayIndex !== null ? "bg-white" : "bg-neutral-200",
                  "p-2 text-center text-sm whitespace-nowrap",
                  isWeekend(dayIndex) ? "font-bold" : "",
                )}
              >
                {dayIndex !== null && dayIndex + 1}
              </div>
            ))}

            {/* Habit rows */}
            {habitList.map((habit) => (
              <React.Fragment key={habit.name}>
                <div className="bg-white p-2 text-sm truncate">
                  {habit.name}
                </div>
                {days.map((dayIndex, i) => (
                  <div
                    key={`${habit.name}-${i}`}
                    className={cn(
                      dayIndex !== null
                        ? "bg-white hover:bg-neutral-50"
                        : "bg-neutral-200",
                      "p-2 text-center text-sm",
                    )}
                    onClick={() =>
                      dayIndex !== null && toggleMark(habit, dayIndex)
                    }
                    role={dayIndex !== null ? "button" : undefined}
                  >
                    {dayIndex !== null && habit.marks[dayIndex]}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
