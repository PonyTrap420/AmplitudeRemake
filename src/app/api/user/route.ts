import { verifySession } from "@/lib/dal";
import { getUser } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await verifySession()

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  
  return NextResponse.json(getUser(id));
}