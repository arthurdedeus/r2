import { useEffect, useState } from "react";
import { Habit, Mark, HabitGroup } from "@/app/habits/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { EditableHabitName } from "@/app/habits/components/editable-habit-name";

interface DayCellProps {
  dayIndex: number | null;
  isWeekend: boolean;
}

const DayCell = ({ dayIndex, isWeekend }: DayCellProps) => (
  <div
    className={cn(
      dayIndex !== null ? "bg-white" : "bg-neutral-200",
      "p-2 text-center text-sm whitespace-nowrap",
      isWeekend ? "font-bold" : "",
    )}
  >
    {dayIndex !== null && dayIndex + 1}
  </div>
);

interface HabitRowProps {
  habit: Habit;
  days: (number | null)[];
  onToggleMark: (habit: Habit, day: number) => void;
  onDelete: (habitId: number) => void;
  onUpdate: (habit: Habit) => void;
}

const HabitRow = ({ habit, days, onToggleMark, onDelete, onUpdate }: HabitRowProps) => (
  <React.Fragment>
    <div className="bg-white p-2 text-sm truncate">
      <EditableHabitName
        habit={habit}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
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
          dayIndex !== null && onToggleMark(habit, dayIndex)
        }
        role={dayIndex !== null ? "button" : undefined}
      >
        {dayIndex !== null && habit.marks[dayIndex]}
      </div>
    ))}
  </React.Fragment>
);

interface NewHabitRowProps {
  newHabit: Habit;
  days: (number | null)[];
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const NewHabitRow = ({ newHabit, days, onInputChange, onBlur, inputRef }: NewHabitRowProps) => (
  <>
    <input
      className="bg-white p-2 text-sm truncate"
      onChange={onInputChange}
      onBlur={onBlur}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      ref={inputRef}
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
);

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
  const { data, isLoading, refetch } = useQuery<HabitGroup>({
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
      refetch(),
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
      return { ...prev, name: event.target.value };
    });
  };

  const createNewHabit = async () => {
    if (!newHabit) return;
    if (!newHabit.name.trim()) return;
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
      refetch()
        .then(() => {
          setNewHabit(null);
        }),
    );
  };

  const handleDeleteHabit = async (habitId: number) => {
    await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
    });
    refetch();
  };

  const handleUpdateHabit = async (updatedHabit: Habit) => {
    await fetch(`/api/habits/${updatedHabit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedHabit.name }),
    });
    refetch();
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
              <DayCell
                key={i}
                dayIndex={dayIndex}
                isWeekend={isWeekend(dayIndex)}
              />
            ))}
            {data?.habits?.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                days={days}
                onToggleMark={toggleMark}
                onDelete={handleDeleteHabit}
                onUpdate={handleUpdateHabit}
              />
            ))}
            {newHabit && (
              <NewHabitRow
                newHabit={newHabit}
                days={days}
                onInputChange={handleInputChange}
                onBlur={createNewHabit}
                inputRef={newHabitInputRef}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
