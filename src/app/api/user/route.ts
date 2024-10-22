import { sessionOptions } from "@/lib/session";
import { getUser } from "@/services/userServices";
import { IronSession, IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session : IronSession<IronSessionData> = await getIronSession(cookies(), sessionOptions);

    if (!session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    
    return NextResponse.json(getUser(id));
}