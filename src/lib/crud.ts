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
  const { data: habitGroup, error } = await supabase
    .from("habitgroups")
    .select(`*, habits(*)`)
    .order("created_at", { foreignTable: "habits", ascending: true })
    .eq("month", month)
    .eq("year", year)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return habitGroup;
}

export async function updateHabit({ id, marks, name }: UpdateHabitProps) {
  const supabase = await createClient();
  const { data: habit, error } = await supabase
    .from("habits")
    .update({ marks, name })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return habit;
}
