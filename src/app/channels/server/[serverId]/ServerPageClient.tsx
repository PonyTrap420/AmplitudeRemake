'use client'

import { Flex, Text } from "@mantine/core";
import { useServer } from '@/hooks/useServer';
import { useChannelMessages } from "@/hooks/useChannelMessages";
import { useState } from "react";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";
import ChatInput from "@/components/Chat/ChatInput";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";
import ServerSidebar from "@/components/Server/ServerSidebar";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import { User } from "@/types/User";

type ServerPageProps = {
    params: { serverId: string };
    currentUser: User;
}

export default function ServerPageClient({ params, currentUser }: ServerPageProps) {
    const { server, isLoading } = useServer(params.serverId);
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const { messages, isLoading: messagesLoading } = useChannelMessages(selectedChannel || '');
    const isOwner = server?.ownerId === currentUser.id;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!server) {
        return <div>Server not found</div>;
    }

    if (!selectedChannel && server.channels.length > 0) {
        setSelectedChannel(server.channels[0].id);
    }

    const currentChannel = server.channels.find(c => c.id === selectedChannel);

    return (
        <>
            <Flex bg={'#1f1f1f'} pos='relative' miw={250} maw={250} align='center' direction='column'>
                <ServerSidebar 
                    serverName={server.name}
                    channels={server.channels}
                    selectedChannel={selectedChannel}
                    isOwner={isOwner}
                    onChannelSelect={setSelectedChannel}
                />
                <ProfileContainer userId={currentUser.id} />
            </Flex>

            <Flex direction="column" style={{position:'relative', flex: 1, backgroundColor: '#0C0C0C' }}>
                {selectedChannel ? (
                    <>
                        <ChatHeader 
                            name={currentChannel?.name || ''} 
                            type="channel"
                        />
                        {messagesLoading ? (
                            <ChatSkeleton />
                        ) : (
                            <>
                                <ChatContent messages={messages || []} />
                                <ChatInput user={currentUser} channelId={selectedChannel} />
                            </>
                        )}
                    </>
                ) : (
                    <Flex align="center" justify="center" h="100%">
                        <Text c="#949BA4">Select a channel to view messages</Text>
                    </Flex>
                )}
            </Flex>
        </>
    );
} 