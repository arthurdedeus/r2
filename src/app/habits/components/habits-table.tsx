import { useEffect, useState } from "react";
import { Habit, Mark, HabitGroup } from "@/app/habits/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);
  const [newHabit, setNewHabit] = useState<Habit | null>(null);
  const newHabitInputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<HabitGroup>({
    queryKey: ["habit-groups", month, year],
    queryFn: async () => {
      const params = new URLSearchParams({
        userId: String(1),
        month: String(month),
        year: String(year),
      }).toString();

      return await (await fetch("/api/habit-groups?" + params)).json();
    },
  });

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

    const newMarks = [...habit.marks];
    newMarks[day] = newMark;

    fetch(`/api/habits/${habit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ marks: newMarks }),
    }).then(() =>
      queryClient.invalidateQueries({
        queryKey: ["habit-groups", month, year],
      }),
    );
  };

  const isWeekend = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(year, month - 1, day + 1);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const getCurrentWeekDays = () => {
    if (isDesktop) {
      return Array.from({ length: daysInMonth }, (_, i) => i);
    }

    const startDay = currentWeek * 7;
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayIndex = startDay + i;
      if (dayIndex < daysInMonth) {
        days.push(dayIndex);
      } else {
        days.push(null);
      }
    }

    return days;
  };

  const days = getCurrentWeekDays();

  const handleAddHabit = () => {
    setNewHabit({
      name: "",
      marks: Array(daysInMonth).fill(""),
      id: 0,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHabit((prev) => {
      if (!prev) return prev;
      console.log({ prev });
      return { ...prev, name: event.target.value };
    });
  };

  const createNewHabit = async () => {
    if (!newHabit) return;
    fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        marks: newHabit.marks,
        month: month,
        name: newHabit.name,
        year: year,
      }),
    }).then(() =>
      queryClient
        .invalidateQueries({
          queryKey: ["habit-groups", month, year],
        })
        .then(() => {
          setNewHabit(null);
        }),
    );
  };

  useEffect(() => {
    newHabitInputRef?.current?.focus();
  }, [newHabit]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  return (
    <div className="overflow-x-auto rounded">
      <div
        className="grid gap-px bg-neutral-200 min-w-full"
        style={isDesktop ? desktopGridStyle : mobileGridStyle}
      >
        {!isLoading && (
          <>
            <div className="flex flex-row justify-between bg-white p-2 font-medium">
              <span>Habit</span>
              <button onClick={handleAddHabit}>+</button>
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
            {data?.habits?.map((habit) => (
              <React.Fragment key={habit.id}>
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
            {newHabit && (
              <>
                <input
                  className="bg-white p-2 text-sm truncate"
                  onChange={handleInputChange}
                  onBlur={createNewHabit}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.currentTarget.blur();
                    }
                  }}
                  ref={newHabitInputRef}
                />
                {days.map((dayIndex, i) => (
                  <div
                    key={`${newHabit.name}-${i}`}
                    className={cn(
                      dayIndex !== null
                        ? "bg-white hover:bg-neutral-50"
                        : "bg-neutral-200",
                      "p-2 text-center text-sm",
                    )}
                    role={dayIndex !== null ? "button" : undefined}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
