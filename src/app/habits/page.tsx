"use client";

import React, { useState } from "react";
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

export default function HabitTracker() {
  const [marks, setMarks] = useState<{ [key: string]: Mark[] }>(() => {
    const initialMarks: { [key: string]: Mark[] } = {};
    habits.forEach((habit) => {
      initialMarks[habit] = Array(31).fill("");
    });
    return initialMarks;
  });

  const [currentWeek, setCurrentWeek] = useState(0);

  const toggleMark = (habit: string, day: number) => {
    setMarks((prev) => {
      const newMarks = { ...prev };
      const currentMark = newMarks[habit][day];
      newMarks[habit] = [...prev[habit]];

      if (currentMark === "") {
        newMarks[habit][day] = "•";
      } else if (currentMark === "•") {
        newMarks[habit][day] = "X";
      } else {
        newMarks[habit][day] = "";
      }

      return newMarks;
    });
  };

  const isWeekend = (day: number) => {
    const date = new Date(2024, 1, day); // February 2024
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const changeWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      if (direction === "prev") {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(3, prev + 1); // Assuming 4 weeks max
      }
    });
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f5f3eb]">
      <div className="max-w-full md:max-w-[1200px] mx-auto">
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
            disabled={currentWeek === 3}
            className="px-2"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="overflow-x-auto rounded">
          <div className="grid grid-cols-[100px_repeat(7,minmax(30px,1fr))] md:grid-cols-[200px_repeat(31,minmax(30px,1fr))] gap-px bg-neutral-200 min-w-full">
            {/* Header row with day numbers */}
            <div className="bg-white p-2 font-medium">
              <span className="hidden md:inline">Habit</span>
            </div>
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-white p-2 text-center text-sm whitespace-nowrap",
                  isWeekend(i + 1) && "font-bold",
                  i < currentWeek * 7 || i >= (currentWeek + 1) * 7
                    ? "hidden md:table-cell"
                    : "table-cell",
                )}
              >
                {i + 1}
              </div>
            ))}

            {/* Habit rows */}
            {habits.map((habit) => (
              <React.Fragment key={habit}>
                <div className="bg-white p-2 text-sm truncate">{habit}</div>
                {Array.from({ length: 31 }, (_, i) => (
                  <button
                    key={`${habit}-${i}`}
                    className={cn(
                      "bg-white hover:bg-neutral-50 p-2 text-center text-sm transition-colors",
                      isWeekend(i + 1) && "font-bold",
                      i < currentWeek * 7 || i >= (currentWeek + 1) * 7
                        ? "hidden md:table-cell"
                        : "table-cell",
                    )}
                    onClick={() => toggleMark(habit, i)}
                  >
                    {marks[habit][i]}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
