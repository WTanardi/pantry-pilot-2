import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const recipes = await prisma.order.findFirst({
    select: {
      id: true,
      totalPrice: true,
      foodId: true,
      userId: true,
      isPaid: true,
    },
    take: -1,
  });

  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  const { totalPrice, foodId, userId, isPaid } = await req.json();

  console.log(
    "totalPrice: ",
    totalPrice,
    "foorID: ",
    foodId,
    "userId: ",
    userId,
    "isPaid: ",
    isPaid
  );

  const order = await prisma.order.create({
    data: {
      totalPrice,
      foodId,
      userId,
      isPaid,
    },
  });

  return NextResponse.json(order);
}
