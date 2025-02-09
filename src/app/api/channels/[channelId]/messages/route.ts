import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function GET(
    request: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            where: {
                channelId: params.channelId,
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

export async function POST(
    request: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content } = await request.json();
        if (!content || typeof content !== 'string') {
            return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
        }

        const message = await prisma.message.create({
            data: {
                content,
                authorId: session.userId,
                channelId: params.channelId,
                pinned: false,
                mentionEveryone: false,
                mentions: [],
                attachments: [],
                embeds: { create: [] }
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

        return NextResponse.json(message);
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 