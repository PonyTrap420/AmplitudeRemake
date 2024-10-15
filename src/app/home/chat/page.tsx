import { Flex, Space } from "@mantine/core";
import Chat from "@/components/Chat/Chat";
import ChatInput from "@/components/Chat/ChatInput";
import ChatHeader from "@/components/Chat/ChatHeader";
import { Suspense } from "react";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";

export default function Page(){

    return <Flex pos='relative' direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
        <ChatHeader/>
        <Suspense fallback={<ChatSkeleton />}>
        <Chat/>
        </Suspense>
        <Space mih={80}></Space>
        <ChatInput/>
    </Flex>
}