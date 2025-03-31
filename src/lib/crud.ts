import { Mark } from "@/app/habits/types";
import { createClient } from "@/lib/supabase/server";

interface GetHabitGroupByMonthProps {
  year: number;
  month: number;
}

interface UpdateHabitProps {
  id: number;
  name?: string;
  marks?: Mark[];
}

export async function getHabitGroupByMonth({
  year,
  month,
}: GetHabitGroupByMonthProps) {
  const supabase = await createClient();
  const { data: habitGroup } = await supabase
    .from("habitgroups")
    .select(`*, habits(*)`)
    .eq("month", month)
    .eq("year", year)
    .single();

  if (!habitGroup) {
    throw new Error("HabitGroup not found");
  }

  return habitGroup;
}

export async function updateHabit({ id, marks, name }: UpdateHabitProps) {
  const supabase = await createClient();
  const { data: habit } = await supabase
    .from("habits")
    .update({ marks, name })
    .eq("id", id)
    .select()
    .single();

  if (!habit) {
    throw new Error("Habit not found");
  }

  return habit;
}
