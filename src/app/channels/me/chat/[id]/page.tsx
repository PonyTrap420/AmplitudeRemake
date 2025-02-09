import { Flex, Space } from "@mantine/core";
import ChatInput from "@/components/Chat/ChatInput";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";
import { getUser } from "@/services/userServices";
import { User } from "@/types/User";
import { verifySession } from "@/lib/dal";

export default async function Page({ params }: { params: { id: string } }) {

  const session = await verifySession()

  if (!session)
    return;

  const user : User | null = await getUser(session.userId);

  if(!user)
    return

  return (
    <Flex pos="relative" direction="column" bg="#0c0c0c" h="100%" w="100%">
      <ChatHeader id={params.id}/>
      <ChatContent />
      <Space mih={80}></Space>
      <ChatInput user={user} />
    </Flex>
  );
}
