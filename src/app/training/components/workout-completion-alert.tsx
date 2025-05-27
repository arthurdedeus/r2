import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface WorkoutCompletionAlertProps {
  elapsedTime: number
  formatTime: (seconds: number) => string
}

export function WorkoutCompletionAlert({ elapsedTime, formatTime }: WorkoutCompletionAlertProps) {
  return (
    <Alert className="mb-6 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
      <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
      <AlertTitle>Workout Completed!</AlertTitle>
      <AlertDescription>You completed this workout in {formatTime(elapsedTime)}. Great job!</AlertDescription>
    </Alert>
  )
}
