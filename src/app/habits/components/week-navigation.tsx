import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekNavigationProps {
  currentWeek: number;
  weeksInMonth: number;
  changeWeek: (direction: "prev" | "next") => void;
}

export const WeekNavigation = ({
  currentWeek,
  weeksInMonth,
  changeWeek,
}: WeekNavigationProps) => {
  return (
    <div className="flex items-center justify-between mb-4 md:hidden">
      <Button
        name="prev"
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
        name="next"
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
  );
};
