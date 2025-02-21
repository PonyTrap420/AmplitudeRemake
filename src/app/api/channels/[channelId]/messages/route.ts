import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function GET(request: Request, { params }: { params: Promise<{ channelId: string }> }) {
    const { channelId } = await params; // Await params
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            where: {
                channelId: channelId,
                directMessage: false
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
            orderBy: {
                timestamp: 'asc'
            }
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ channelId: string }> }) {
    const { channelId } = await params; // Await params
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, attachments } = await request.json();

        if ((!content || typeof content !== 'string') && (!attachments || attachments.length === 0)) {
            return NextResponse.json({ error: 'Invalid content or attachments required' }, { status: 400 });
        }

        const currentUserId = session.userId;

        const message = await prisma.message.create({
            data: {
                content: content,
                authorId: currentUserId,
                channelId: channelId,
                directMessage: false,
                timestamp: new Date(),
                mentionEveryone: false,
                pinned: false,
                attachments: attachments
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
            }
        });

        return NextResponse.json({ message }, { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 