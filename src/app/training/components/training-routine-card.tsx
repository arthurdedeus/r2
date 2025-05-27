import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock } from "lucide-react"
import type { TrainingRoutine } from "@/types/training"

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
        <Link href={`/training/${routine.id}`} className="w-full">
          <Button className="w-full cursor-pointer">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
