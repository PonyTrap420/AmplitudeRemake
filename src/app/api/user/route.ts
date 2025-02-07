import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await verifySession()

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log(id)

  if (!id) 
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

  const user = await getUser(id);
  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    // Validate status
    if (!["online", "idle", "dnd", "offline"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update user status in the database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}