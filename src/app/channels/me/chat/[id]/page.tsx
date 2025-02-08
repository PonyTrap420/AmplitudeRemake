import { getUser } from "@/services/userServices";
import { verifySession } from "@/lib/dal";
import ChatPageClient from "./ChatPageClient";

export default async function ChatPage({ params }: { params: { id: string } }) {
    const session = await verifySession();
    if (!session) return null;

    const user = await getUser(session.userId );
    if (!user) return null;

    const otherUser = await getUser(params.id);
    if (!otherUser) return null;
    
    return <ChatPageClient user={user} otherUser={otherUser} />;

}
