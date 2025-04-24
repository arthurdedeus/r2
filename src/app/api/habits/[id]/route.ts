import { Mark } from "@/app/habits/types";
import { updateHabit, deleteHabit } from "@/lib/crud";
import { Tables } from "@/lib/supabase/database.types";
import { NextRequest, NextResponse } from "next/server";

interface PatchHabitBody {
  name?: string;
  marks?: Mark[];
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Tables<"habits"> | { error: string }>> {
  const id = Number((await params).id);
  const body: PatchHabitBody = await request.json();
  try {
    const habit = await updateHabit({
      id: id,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  const id = Number((await params).id);
  try {
    await deleteHabit(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
