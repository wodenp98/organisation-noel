// app/api/getMenu/route.ts
import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        entries: true,
        flat: true,
        desserts: true,
        alcoholSoft: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Convertir les chaînes en tableaux
    const [entree1, entree2] = user.entries
      ? user.entries.split(", ")
      : ["", ""];
    const [plat1, plat2] = user.flat ? user.flat.split(", ") : ["", ""];
    const [dessert1, dessert2] = user.desserts
      ? user.desserts.split(", ")
      : ["", ""];
    const [alcohol1, alcohol2] = user.alcoholSoft
      ? user.alcoholSoft.split(", ")
      : ["", ""];

    return NextResponse.json({
      success: true,
      menu: {
        entree1,
        entree2,
        plat1,
        plat2,
        dessert1,
        dessert2,
        alcohol1,
        alcohol2,
      },
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération du menu" },
      { status: 500 }
    );
  }
}