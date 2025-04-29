import { Clock, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExerciseMetadataProps {
  restTime: number
  technique?: string
  isEditable: boolean
}

export function ExerciseMetadata({ restTime, technique, isEditable }: ExerciseMetadataProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-1 text-sm">
        <Clock className="h-4 w-4" />
        <span>Rest: {restTime}s</span>
      </div>

      {technique && (
        <Badge variant="secondary" className="text-sm">
          {technique}
        </Badge>
      )}

      {!isEditable && (
        <Badge variant="outline" className="text-sm bg-muted/50">
          <Lock className="h-3 w-3 mr-1" /> Locked
        </Badge>
      )}
    </div>
  )
}
