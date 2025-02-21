import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function GET(request: Request, { params }: { params: Promise<{ serverId: string }> }) {
    const { serverId } = await params; // Await params
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const server = await prisma.server.findUnique({
            where: { id: serverId },
            include: {
                channels: {
                    orderBy: { position: 'asc' }
                },
                categories: {
                    include: {
                        channels: {
                            orderBy: { position: 'asc' }
                        }
                    },
                    orderBy: { position: 'asc' }
                }
            }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        // If user is not a member, return limited info
        if (!server.membersIDs.includes(session.userId)) {
            return NextResponse.json({
                name: server.name,
                imageUrl: server.imageUrl
            });
        }

        return NextResponse.json(server);
    } catch (error) {
        console.error('Error fetching server:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ serverId: string }> }) {
    const { serverId } = await params; // Await params
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const server = await prisma.server.findUnique({
            where: { id: serverId }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        // If owner, delete the server
        if (server.ownerId === session.userId) {
            await prisma.$transaction([
                prisma.message.deleteMany({
                    where: {
                        channel: {
                            serverId: serverId
                        }
                    }
                }),
                prisma.channel.deleteMany({
                    where: { serverId: serverId }
                }),
                prisma.invite.deleteMany({
                    where: { serverId: serverId }
                }),
                prisma.server.delete({
                    where: { id: serverId }
                })
            ]);
        } 
        // If member, leave the server
        else {
            await prisma.server.update({
                where: { id: serverId },
                data: {
                    membersIDs: {
                        set: server.membersIDs.filter(id => id !== session.userId)
                    }
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error with server operation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 