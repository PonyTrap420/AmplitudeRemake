import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function GET(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const server = await prisma.server.findUnique({
            where: {
                id: params.serverId
            },
            include: {
                channels: true
            }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        // Check if user is a member or owner
        if (server.ownerId !== session.userId && !server.membersIDs.includes(session.userId)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json(server);
    } catch (error) {
        console.error('Error fetching server:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 