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

interface CreateHabitProps {
  name: string;
  marks: Mark[];
  habitGroupId: number;
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

export async function getOrCreateHabitGroup({
  year,
  month,
}: GetHabitGroupByMonthProps) {
  const supabase = await createClient();

  let habitGroup;
  try {
    habitGroup = await getHabitGroupByMonth({ year, month });
    return habitGroup;
  } catch (error) {
    console.error(error);
  }

  const { data: newHabitGroup, error } = await supabase
    .from("habitgroups")
    .insert({ month, year })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newHabitGroup;
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

export async function createHabit({
  habitGroupId,
  marks,
  name,
}: CreateHabitProps) {
  const supabase = await createClient();
  const { data: habit, error } = await supabase
    .from("habits")
    .insert({ marks, name, habit_group_id: habitGroupId })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return habit;
}

export async function deleteHabit(id: number) {
  const supabase = await createClient();
  const response = await supabase
    .from("habits")
    .delete()
    .eq("id", id);
  console.log(response);

  if (response.error) {
    throw new Error(response.error.message);
  }
}
