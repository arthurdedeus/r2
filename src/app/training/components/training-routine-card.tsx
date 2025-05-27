import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock } from "lucide-react"
import type { TrainingRoutine } from "@/types/training"
import { cn } from "@/lib/utils"

interface TrainingRoutineCardProps {
  routine: TrainingRoutine
}

export function TrainingRoutineCard({ routine }: TrainingRoutineCardProps) {
  // Calculate completion percentage with safety check for zero target
  const completionPercentage = routine.targetCompletions > 0
    ? Math.min(Math.round((routine.completedCount / routine.targetCompletions) * 100), 100)
    : 0

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{routine.title}</CardTitle>
        <CardDescription>{routine.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow px-4 sm:px-6">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Dumbbell className="h-4 w-4" />
            <span>{routine.exerciseCount} exercises</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Estimated duration: {routine.estimatedDuration} min</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completed {routine.completedCount} times</span>
            <span>{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/training/${routine.id}`}
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2",
            "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:pointer-events-none",
            "w-full"
          )}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}
