import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export async function getUser(id?: string) {

    const users = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            banner: true,
            accent_color: true,
            banner_color: true,
            status: true,
        }
    });

    return users;
}

export async function getCurrentUser()
{
    const session = await verifySession();

    if (!session)
        return;

    const users = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            banner: true,
            accent_color: true,
            banner_color: true,
            status: true,
            email:true,
            phone:true,
        }
    });

    return users;
}