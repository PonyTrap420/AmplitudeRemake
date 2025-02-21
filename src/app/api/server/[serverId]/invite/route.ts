import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';
import { nanoid } from 'nanoid';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    const { serverId } = await params;
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Find existing non-expired invite or create new one
        let invite = await prisma.invite.findFirst({
            where: {
                serverId: serverId,
                expiresAt: { gt: new Date() },
                uses: { lt: 100 }
            }
        });

        if (!invite) {
            invite = await prisma.invite.create({
                data: {
                    code: nanoid(8),
                    serverId: serverId,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                }
            });
        }

        return NextResponse.json({ code: invite.code });
    } catch (error) {
        console.error('Error handling invite:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    const { serverId } = await params;
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const server = await prisma.server.findUnique({
            where: { id: serverId },
            include: { members: true }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        if (server.membersIDs.includes(session.userId)) {
            return NextResponse.json({ error: 'Already a member' }, { status: 400 });
        }

        // Add user to server
        await prisma.server.update({
            where: { id: serverId },
            data: {
                membersIDs: {
                    push: session.userId
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error joining server:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 