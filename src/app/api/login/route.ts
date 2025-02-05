import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import { createSession } from '@/lib/session';
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ errors: { email: 'Email does not exist' } }, { status: 400 });
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return NextResponse.json({ errors: { password: 'Invalid password' } }, { status: 400 });
    }
    
    await createSession(user.id)

    return NextResponse.json({ success: true});
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ errors: { general: 'Something went wrong. Try again.' } }, { status: 500 });
  }
}
