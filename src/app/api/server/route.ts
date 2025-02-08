import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const servers = await prisma.server.findMany({
      where: {
        OR: [
          { ownerId: session.userId },
          { membersIDs: { has: session.userId } }
        ]
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json(servers);
  } catch (error) {
    console.error('Error fetching servers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, template } = await request.json();
    const currentUserId = session.userId;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid server name' }, { status: 400 });
    }

    const allowedTemplates = ['custom', 'gaming', 'friends', 'study', 'community', 'artists'];
    if (template && !allowedTemplates.includes(template)) {
      return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
    }

    const server = await prisma.server.create({
      data: {
        name,
        ownerId: currentUserId,
        membersIDs: [currentUserId],
        channels: {
          create: getDefaultChannels(template),
        },
      },
    });

    return NextResponse.json({ server }, { status: 201 });
  } catch (error) {
    console.error('Error creating server:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getDefaultChannels(template?: 'custom' | 'gaming' | 'friends' | 'study' | 'community' | 'artists') {
  const defaultChannels = [{ name: 'general' }];
  const templateChannels = {
    custom: [{ name: 'general' }],
    gaming: [{ name: 'game-chat' }, { name: 'strategy' }],
    friends: [{ name: 'hangout' }, { name: 'memes' }],
    study: [{ name: 'study-help' }, { name: 'resources' }],
    community: [{ name: 'announcements' }, { name: 'events' }],
    artists: [{ name: 'art-share' }, { name: 'collabs' }],

  };
  return template ? [...defaultChannels, ...(templateChannels[template] || [])] : defaultChannels;
}
