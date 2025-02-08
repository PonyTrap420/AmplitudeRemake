'use client'

import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";
import ChatInput from "@/components/Chat/ChatInput";
import { User } from "@/types/User";
import { Flex, Space } from "@mantine/core";

export default function ChatPageClient({ user, otherUser }: { user: User, otherUser: User }) {
    return (
        <Flex h="100%" w='100%' pos='relative' direction="column" style={{ backgroundColor: '#0C0C0C' }}>
            <ChatHeader user={otherUser} type="direct" />
            <ChatContent />
            <Space mih={70}></Space>
            <ChatInput user={user} otherUser={otherUser} />
        </Flex>
    );
} 