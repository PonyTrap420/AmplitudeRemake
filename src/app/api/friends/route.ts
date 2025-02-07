import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RelationshipStatus } from '@prisma/client';
import { verifySession } from '@/lib/dal';

export async function POST(request: Request) {
  try {

    const session = await verifySession()
 
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { username } = await request.json();
    const currentUserId = session.userId;

    const userToAdd = await prisma.user.findUnique({
      where: { username },
    });

    if (!userToAdd) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if there's an existing relationship between the two users
    const existingRelationship = await prisma.relationship.findFirst({
      where: {
        OR: [
          { fromUserId: currentUserId, toUserId: userToAdd.id },
          { fromUserId: userToAdd.id, toUserId: currentUserId },
        ],
      },
    });

    if (existingRelationship) {
      if (
        existingRelationship.status === 'pending' &&
        existingRelationship.fromUserId === userToAdd.id &&
        existingRelationship.toUserId === currentUserId
      ) {
        // Update the status to 'confirmed'
        const updatedRelationship = await prisma.relationship.update({
          where: { id: existingRelationship.id },
          data: { status: 'confirmed' },
        });
        return NextResponse.json(updatedRelationship, { status: 200 });
      }

      return NextResponse.json({ error: 'Already added' }, { status: 400 });
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
  
export async function PATCH(request: Request) {
  try {

    const session = await verifySession()

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { action, userId } = await request.json();
    const currentUserId = session.userId;

    const existingRelationship = await prisma.relationship.findFirst({
      where: {
        OR: [
          { fromUserId: currentUserId, toUserId: userId },
          { fromUserId: userId, toUserId: currentUserId },
        ],
      },
    });

    if (!existingRelationship) {
      return NextResponse.json({ error: 'Relationship not found' }, { status: 404 });
    }

    let updatedRelationship;

    switch (action) {
      case 'accept':
        updatedRelationship = await prisma.relationship.update({
          where: { id: existingRelationship.id },
          data: { status: 'confirmed' }, // Assuming 'confirmed' is the status for an accepted relationship
        });
        break;

      case 'reject':
        updatedRelationship = await prisma.relationship.delete({
          where: { id: existingRelationship.id },
        });
        break;

      case 'cancel':
        updatedRelationship = await prisma.relationship.delete({
          where: { id: existingRelationship.id },
        });
        break;
      case 'delete':
        updatedRelationship = await prisma.relationship.delete({
          where: { id: existingRelationship.id },
        });
      break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Relationship updated successfully', updatedRelationship }, { status: 200 });

  } catch (error) {
    console.error("Error updating relationship:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

  
export async function GET(request: Request) {
   
  const session = await verifySession()
 
  if (!session)
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.userId;

  const { searchParams } = new URL(request.url);
  let status: RelationshipStatus = "confirmed";
  if (searchParams.get('status') === 'blocked')
    status = RelationshipStatus.blocked_to;
  else if (searchParams.get('status') && Object.values(RelationshipStatus).includes(searchParams.get('status') as RelationshipStatus)) {
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

  const userMap = relationships.map(relationship => ({
    userId: relationship.fromUserId === userId ? relationship.toUserId : relationship.fromUserId,
    isSender: !(relationship.fromUserId === userId)
  }));
  
  const userIds = userMap.map(user=>user.userId);

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
        banner_color:true,
        status:true
    }
  });

  const usersWithSenderInfo = users.map(user => {
    const relationshipInfo = userMap.find(u => u.userId === user.id);
    return {
      ...user,
      isSender: relationshipInfo ? relationshipInfo.isSender : false,
    };
  });


  return NextResponse.json(usersWithSenderInfo);
}