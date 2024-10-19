import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sessionOptions } from '@/lib/session';
import { IronSession, IronSessionData, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { RelationshipStatus } from '@prisma/client';

export async function POST(request: Request) {
    try {

      const session : IronSession<IronSessionData> = await getIronSession(cookies(), sessionOptions);

      if(!session.user)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const { username } = await request.json();
  
      const currentUserId = session.user.id;
  
      // Fetch the user to whom the friend request is being sent
      const userToAdd = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!userToAdd) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const friendship = await prisma.relationship.create({
        data: {
          fromUserId: currentUserId,
          toUserId: userToAdd.id,
          status: 'pending',
        },
      });
  
      return NextResponse.json(friendship, { status: 201 });
    } catch (error) {
      console.error('Error adding friend:', error);
      return NextResponse.json({ error: 'Error adding friend' }, { status: 500 });
    }
  }
  
  
export async function GET(request: Request) {
    const session : IronSession<IronSessionData> = await getIronSession(cookies(), sessionOptions);

    if (!session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    let status: RelationshipStatus = "confirmed";
    if (searchParams.get('status') && Object.values(RelationshipStatus).includes(searchParams.get('status') as RelationshipStatus)) {
        status = searchParams.get('status') as RelationshipStatus;
    }

    const relationships = await prisma.relationship.findMany({
      where: {
        OR: [
          {
            fromUserId: userId,
            status: status,
          },
          {
            toUserId: userId,
            status: status,
          },
        ],
      },
      include: {
        fromUser: true, 
        toUser: true,
      },
    });
  
   // Create a unique list of user objects
   const userIds = relationships.map(relationship => 
    relationship.fromUserId === userId ? relationship.toUserId : relationship.fromUserId
  );

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select:{
        id:true,
        username:true,
        displayName:true,
        avatar:true,
        banner:true,
        accent_color:true,
        banner_color:true
    }
  });

  return NextResponse.json(users);
  }