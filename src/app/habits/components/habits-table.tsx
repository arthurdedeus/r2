import { useEffect, useState } from "react";
import { Habit, Mark } from "../types";
import { db } from "@/database";
import { cn } from "@/lib/utils";
import React from "react";

interface HabitsTableProps {
  currentWeek: number;
  daysInMonth: number;
  month: number;
  year: number;
}

export const HabitsTable = ({
  currentWeek,
  daysInMonth,
  month,
  year,
}: HabitsTableProps) => {
  const [user] = useState({
    id: 1,
    name: "Arthur",
    email: "john.doe@example.com",
  });
  const [habitList, setHabitList] = useState<Habit[]>([]);

  const mobileGridStyle = {
    gridTemplateColumns: "100px repeat(7, minmax(30px, 1fr))",
  };

  const desktopGridStyle = {
    gridTemplateColumns: `200px repeat(${daysInMonth}, minmax(30px, 1fr))`,
  };

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

  const getCurrentWeekDays = () => {
    // FIXME: This is raising an error when window is not defined
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

  useEffect(() => {
    const habitGroup = db.habitGroups.find(
      (group) =>
        group.userId === user.id &&
        group.year === year &&
        group.month === month,
    );
    if (!habitGroup) {
      setHabitList([]);
      return;
    }
    const habitList = habitGroup.habits.map((habit) => ({
      name: habit.name,
      marks: habit.marks,
    }));
    setHabitList(habitList);
  }, [user, month, year]);

  return (
    <div className="overflow-x-auto rounded">
      <div
        className="grid gap-px bg-neutral-200 min-w-full"
        style={window?.innerWidth >= 768 ? desktopGridStyle : mobileGridStyle}
      >
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

        {habitList.map((habit) => (
          <React.Fragment key={habit.name}>
            <div className="bg-white p-2 text-sm truncate">{habit.name}</div>
            {days.map((dayIndex, i) => (
              <div
                key={`${habit.name}-${i}`}
                className={cn(
                  dayIndex !== null
                    ? "bg-white hover:bg-neutral-50"
                    : "bg-neutral-200",
                  "p-2 text-center text-sm",
                )}
                onClick={() => dayIndex !== null && toggleMark(habit, dayIndex)}
                role={dayIndex !== null ? "button" : undefined}
              >
                {dayIndex !== null && habit.marks[dayIndex]}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
