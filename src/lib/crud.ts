import { createClient } from "@/lib/supabase/server";

interface GetHabitGroupByMonthProps {
  userId: number;
  year: number;
  month: number;
}

export async function getHabitGroupByMonth({
  userId,
  year,
  month,
}: GetHabitGroupByMonthProps) {
  const supabase = await createClient();
  const { data: habitGroup } = await supabase
    .from("habit_groups")
    .select(`*, habits(*)`)
    .eq("user_id", userId)
    .eq("month", month)
    .eq("year", year)
    .single();

  if (!habitGroup) {
    throw new Error("HabitGroup not found");
  }

  return habitGroup;
}
