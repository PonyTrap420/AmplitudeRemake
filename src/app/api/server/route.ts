import { NextResponse, NextRequest } from 'next/server';
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

const allowedTemplates = ['custom', 'gaming', 'friends', 'study', 'community', 'artists'] as const;
type Template = typeof allowedTemplates[number];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const template = formData.get('template') as Template;
    const image = formData.get('image') as File;

    // Check file size if image exists (5MB = 5 * 1024 * 1024 bytes)
    if (image && image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size must be less than 5MB' }, 
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      imageUrl = `data:${image.type};base64,${base64}`;
    }

    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = session.userId;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid server name' }, { status: 400 });
    }

    if (template && !allowedTemplates.includes(template)) {
      return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
    }

    const serverCreated = await prisma.server.create({
      data: {
        name,
        ownerId: currentUserId,
        membersIDs: [currentUserId],
        channels: {
          create: getDefaultChannels(template),
        },
        imageUrl,
      },
    });

    return NextResponse.json(serverCreated, { status: 201 });
  } catch (error) {
    console.error('Error creating server:', error);
    return NextResponse.json({ error: 'Error creating server' }, { status: 500 });
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
