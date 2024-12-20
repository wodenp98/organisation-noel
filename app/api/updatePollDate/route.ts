import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  try {
    const { userId, pollDate } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { pollDate },
      select: {
        id: true,
        name: true,
        pollDate: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating poll date:", error);
    return NextResponse.json(
      { error: "Failed to update poll date" },
      { status: 500 }
    );
  }
}
