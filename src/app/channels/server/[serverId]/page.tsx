import { verifySession } from "@/lib/dal";
import { getUser } from "@/services/userServices";
import ServerPageClient from "./ServerPageClient";

export default async function ServerPage({ params }: { params: { serverId: string } }) {
    const session = await verifySession();
    if (!session) return null;

    const currentUser = await getUser(session.userId);
    if (!currentUser) return null;

    return <ServerPageClient params={params} currentUser={currentUser} />;
} 