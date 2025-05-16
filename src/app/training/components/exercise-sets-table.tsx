"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Exercise, SetData } from "@/types/training"

interface ExerciseSetsTableProps {
  exercise: Exercise
  isEditable: boolean
  editingSet: number | null
  editValues: SetData
  handleInputChange: (field: keyof SetData, value: string) => void
  handleEditSet: (setIndex: number) => void
  handleSaveSet: (setIndex: number) => void
  isSetCompleted: (setIndex: number) => boolean
  toggleSetCompletion: (setIndex: number, checked: boolean) => void
}

export function ExerciseSetsTable({
  exercise,
  isEditable,
  editingSet,
  editValues,
  handleInputChange,
  handleEditSet,
  handleSaveSet,
  isSetCompleted,
  toggleSetCompletion,
}: ExerciseSetsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="py-2 px-2 text-left font-medium text-sm">Set</th>
            <th className="py-2 px-2 text-left font-medium text-sm">Target Reps</th>
            <th className="py-2 px-2 text-left font-medium text-sm">Executed Reps</th>
            <th className="py-2 px-2 text-left font-medium text-sm">Executed Weight</th>
            <th className="py-2 px-2 text-center font-medium text-sm">Completed</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: exercise.sets }).map((_, index) => {
            const targetSet = exercise.targetSets[index] || { reps: 0, weight: 0 }
            const executedSet = exercise.executedSets?.[index]
            const isCompleted = isSetCompleted(index)
            const isEditing = editingSet === index

            return (
              <tr key={index} className="border-b last:border-0 dark:border-gray-700">
                <td className="py-3 px-2 font-medium">{index + 1}</td>
                <td className="py-3 px-2">{targetSet.reps}</td>

                {/* Executed Reps - Editable */}
                <td className="py-3 px-2">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editValues.reps}
                      onChange={(e) => handleInputChange("reps", e.target.value)}
                      className="w-20 h-8"
                      min="0"
                    />
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded",
                        isEditable && isCompleted && "cursor-pointer hover:bg-muted/50",
                        !isCompleted && "text-muted-foreground dark:text-gray-400 italic",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isEditable && isCompleted) {
                          handleEditSet(index)
                        }
                      }}
                    >
                      {executedSet ? executedSet.reps : "—"}
                    </div>
                  )}
                </td>

                {/* Executed Weight - Editable */}
                <td className="py-3 px-2">
                  {isEditing ? (
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={editValues.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        className="w-20 h-8"
                        min="0"
                        step="2.5"
                      />
                      <span className="ml-1">kg</span>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded",
                        isEditable && isCompleted && "cursor-pointer hover:bg-muted/50",
                        !isCompleted && "text-muted-foreground dark:text-gray-400 italic",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isEditable && isCompleted) {
                          handleEditSet(index)
                        }
                      }}
                    >
                      {executedSet ? `${executedSet.weight} kg` : "—"}
                    </div>
                  )}
                </td>

                {/* Completion Status Checkbox */}
                <td className="py-3 px-2">
                  {isEditing ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSaveSet(index)
                      }}
                      disabled={!isEditable}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`set-${exercise.id}-${index}`}
                        checked={isCompleted}
                        onCheckedChange={(checked) => {
                          if (isEditable) {
                            toggleSetCompletion(index, checked === true)
                            if (checked === true && !executedSet) {
                              // If checking and no executed values yet, open edit mode
                              setTimeout(() => handleEditSet(index), 0)
                            }
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        disabled={!isEditable}
                      />
                      {isEditable && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditSet(index)
                          }}
                          disabled={!isCompleted}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
