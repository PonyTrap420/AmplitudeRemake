import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await verifySession()

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = (await params).id;
    const { content, attachments } = await request.json();

    if ((!content || typeof content !== 'string') && (!attachments || attachments.length === 0)) {
        return NextResponse.json({ error: 'Invalid content or attachments required' }, { status: 400 });
    }
    
    const currentUserId = session.userId;

    const message = await prisma.message.create({
      data: {
        content: content,
        authorId: currentUserId,
        receiverId: id,
        directMessage: true,
        timestamp: new Date(),
        mentionEveryone:false,
        pinned:false,
        attachments: attachments
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
   
    const session = await verifySession()
 
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = (await params).id;

    const currentUserId = session.userId;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { authorId: currentUserId, receiverId: id },
          { authorId: id, receiverId: currentUserId },
        ],
        directMessage: true,
      },
      orderBy: {
        timestamp: 'asc',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error getting messages:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
