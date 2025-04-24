import { useEffect, useState } from "react";
import { Habit, Mark, HabitGroup } from "@/app/habits/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditableHabitNameProps {
  habit: Habit;
  onDelete: (habitId: number) => void;
  onUpdate: (habit: Habit) => void;
}

const EditableHabitName = ({ habit, onDelete, onUpdate }: EditableHabitNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(habit.id);
    setShowMenu(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleBlur = () => {
    if (editedName !== habit.name) {
      onUpdate({ ...habit, name: editedName });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  if (isEditing) {
    return (
      <input
        className="w-full bg-transparent outline-none"
        value={editedName}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    );
  }

  return (
    <div className="flex items-center justify-between h-full">
      <span className="flex-1 truncate">{habit.name}</span>
      <div className="relative flex items-center -mr-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0"
          onClick={toggleMenu}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
        {showMenu && (
          <div ref={menuRef} className="fixed transform -translate-y-1 min-w-[120px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <button
                className="flex items-center w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                className="flex items-center w-full px-3 py-1.5 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

  const handleDeleteHabit = async (habitId: number) => {
    await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries({
      queryKey: ["habit-groups", month, year],
    });
  };

  const handleUpdateHabit = async (updatedHabit: Habit) => {
    await fetch(`/api/habits/${updatedHabit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedHabit.name }),
    });
    queryClient.invalidateQueries({
      queryKey: ["habit-groups", month, year],
    });
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
                  <EditableHabitName
                    habit={habit}
                    onDelete={handleDeleteHabit}
                    onUpdate={handleUpdateHabit}
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
