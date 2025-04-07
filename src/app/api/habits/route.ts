import { Mark } from "@/app/habits/types";
import { createHabit, getOrCreateHabitGroup } from "@/lib/crud";
import { Tables } from "@/lib/supabase/database.types";
import { NextRequest, NextResponse } from "next/server";

interface CreateHabitBody {
  name: string;
  marks: Mark[];
  month: number;
  year: number;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Tables<"habits"> | { error: string }>> {
  const body: CreateHabitBody = await request.json();
  const habitGroup = await getOrCreateHabitGroup({
    month: body.month,
    year: body.year,
  });

  try {
    const habit = await createHabit({
      habitGroupId: habitGroup.id,
      marks: body.marks,
      name: body.name,
    });

    return NextResponse.json(habit, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
