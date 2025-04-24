import { Habit } from "@/app/habits/types";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface EditableHabitNameProps {
  habit: Habit;
  onDelete: (habitId: number) => void;
  onUpdate: (habit: Habit) => void;
}

export const EditableHabitName = ({ habit, onDelete, onUpdate }: EditableHabitNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
