'use server'

import { verifySession } from "@/lib/dal";
import { getUser } from "@/services/userServices";

export default async function useSession() {
    const session = await verifySession();
    if (!session) return null;

    const currentUser = await getUser(session.userId);
    if (!currentUser) return null;


    return currentUser;
} 