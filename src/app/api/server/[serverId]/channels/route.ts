import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

export async function POST(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const server = await prisma.server.findUnique({
            where: { id: params.serverId }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        // Only owner can create channels
        if (server.ownerId !== session.userId) {
            return NextResponse.json({ error: 'Only server owner can create channels' }, { status: 403 });
        }

        const { name, type, isPrivate, categoryId } = await request.json();
        
        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid channel name' }, { status: 400 });
        }

        const channel = await prisma.channel.create({
            data: {
                name,
                type: type || 'text',
                isPrivate: isPrivate || false,
                serverId: params.serverId,
                categoryId: categoryId || null
            }
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.error('Error creating channel:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { channelId } = await request.json();

        const server = await prisma.server.findUnique({
            where: { id: params.serverId }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        if (server.ownerId !== session.userId) {
            return NextResponse.json({ error: 'Only server owner can delete channels' }, { status: 403 });
        }

        await prisma.$transaction([
            prisma.message.deleteMany({
                where: { channelId }
            }),
            prisma.channel.delete({
                where: { id: channelId }
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting channel:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 

export async function PATCH(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { channelId, name } = await request.json();

        const channel = await prisma.channel.update({
            where: {
                id: channelId,
                serverId: params.serverId
            },
            data: {
                name
            }
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.error('Failed to update channel:', error);
        return NextResponse.json(
            { error: "Failed to update channel" },
            { status: 500 }
        );
    }
}