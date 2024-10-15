import { Flex, Space } from "@mantine/core";
import Chat from "@/components/Chat/Chat";
import ChatInput from "@/components/Chat/ChatInput";
import ChatHeader from "@/components/Chat/ChatHeader";
import { Suspense } from "react";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";
import { Message } from "@/types/Message";

export default async function Page(){
    await new Promise(resolve => setTimeout(resolve, 300));
    const data = await import("@/.mock/messages.json");
    const messages: Message[] = data.default as unknown as Message[];
    const reversedMessages = [...messages].reverse();

    return <Flex pos='relative' direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
        <ChatHeader/>
        <Suspense fallback={<ChatSkeleton />}>
        <Chat messages={reversedMessages}/>
        </Suspense>
        <Space mih={80}></Space>
        <ChatInput/>
    </Flex>
}