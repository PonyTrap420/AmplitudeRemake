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
                author: true
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