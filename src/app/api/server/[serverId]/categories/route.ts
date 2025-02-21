import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/dal';

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
            where: { id: serverId }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        if (server.ownerId !== session.userId) {
            return NextResponse.json({ error: 'Only server owner can create categories' }, { status: 403 });
        }

        const { name } = await request.json();
        
        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid category name' }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                name,
                serverId: serverId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    const { serverId } = await params;
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { categoryId } = await request.json();

        const server = await prisma.server.findUnique({
            where: { id: serverId }
        });

        if (!server) {
            return NextResponse.json({ error: 'Server not found' }, { status: 404 });
        }

        if (server.ownerId !== session.userId) {
            return NextResponse.json({ error: 'Only server owner can delete categories' }, { status: 403 });
        }

        await prisma.$transaction([
            prisma.channel.updateMany({
                where: { categoryId },
                data: { categoryId: null }
            }),
            prisma.category.delete({
                where: { id: categoryId }
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ serverId: string }> }
) {
    const { serverId } = await params;
    try {
        const session = await verifySession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { categoryId, name } = await request.json();

        const category = await prisma.category.update({
            where: {
                id: categoryId,
                serverId: serverId
            },
            data: {
                name
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Failed to update category:', error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}