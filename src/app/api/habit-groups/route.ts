import { getHabitGroupByMonth } from "@/lib/crud";
import { Tables } from "@/lib/supabase/database.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Tables<"habitgroups"> | { error: string }>> {
  const searchParams = request.nextUrl.searchParams;
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  try {
    const habitGroup = await getHabitGroupByMonth({
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
