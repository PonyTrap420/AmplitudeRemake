import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    try {
        const invite = await prisma.invite.findUnique({
            where: { code: code }
        });

        if (!invite) {
            return NextResponse.json({ error: 'Invalid invite' }, { status: 404 });
        }

        if (invite.expiresAt < new Date() || invite.uses >= invite.maxUses) {
            // Delete expired/maxed invite
            await prisma.invite.delete({
                where: { id: invite.id }
            });
            return NextResponse.json({ error: 'Invite expired' }, { status: 410 });
        }

        // Increment uses
        await prisma.invite.update({
            where: { id: invite.id },
            data: { uses: { increment: 1 } }
        });

        return NextResponse.json({ serverId: invite.serverId });
    } catch (error) {
        console.error('Error processing invite:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 