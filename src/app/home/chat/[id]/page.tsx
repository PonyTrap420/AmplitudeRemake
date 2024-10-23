import { Flex, Space } from "@mantine/core";
import ChatInput from "@/components/Chat/ChatInput";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";
import { sessionOptions } from "@/lib/session";
import { getUser } from "@/services/userServices";
import { IronSession, IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@/types/User";

export default async function Page({ params }: { params: { id: string } }) {

  const session : IronSession<IronSessionData> = await getIronSession(cookies(), sessionOptions);

  if(!session.user)
      return; 

  const user : User | null = await getUser(session.user.id);

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
