import { getHabitGroupByMonth } from "@/lib/crud";
import { Tables } from "@/lib/supabase/database.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Tables<"habit_groups"> | { error: string }>> {
  // TODO: Get user id from auth
  const searchParams = request.nextUrl.searchParams;
  const userId = Number(searchParams.get("userId"));
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  try {
    const habitGroup = await getHabitGroupByMonth({
      userId: userId,
      month: month,
      year: year,
    });
    return NextResponse.json(habitGroup, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
