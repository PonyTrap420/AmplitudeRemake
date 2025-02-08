'use client'

import { Box, Flex, ScrollArea, Text, Title } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import { useServer } from '@/hooks/useServer'
import { useChannelMessages } from "@/hooks/useChannelMessages";
import { useState } from "react";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";
import ChatInput from "@/components/Chat/ChatInput";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";

export default function ServerPage({ params }: { params: { serverId: string } }) {
    const { server, isLoading } = useServer(params.serverId);
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const { messages, isLoading: messagesLoading } = useChannelMessages(selectedChannel || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!server) {
        return <div>Server not found</div>;
    }

    // Set initial selected channel if none selected
    if (!selectedChannel && server.channels.length > 0) {
        setSelectedChannel(server.channels[0].id);
    }

    const currentChannel = server.channels.find(c => c.id === selectedChannel);

    return (
        <Flex w="100%" h="100vh">
            {/* Channels Sidebar */}
            <Box w={240} bg="#1f1f1f" h="100%" style={{ borderRight: '1px solid #0C0C0C' }}>
                <ScrollArea h="100%" type="hover" scrollbarSize={8} 
                    styles={{
                        scrollbar: {
                            '&, &:hover': {
                                background: 'transparent'
                            },
                            '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                                backgroundColor: '#0C0C0C'
                            }
                        }
                    }}
                >
                    <Box p="md">
                        <Title order={4} c="#F2F3F5" mb="md">{server.name}</Title>
                        
                        <Text size="sm" c="#949BA4" fw={500} mb={8}>TEXT CHANNELS</Text>
                        
                        <Flex direction="column" gap={2}>
                            {server.channels.map((channel) => (
                                <Flex
                                    key={channel.id}
                                    align="center"
                                    gap={8}
                                    p={8}
                                    style={(theme) => ({
                                        borderRadius: theme.radius.sm,
                                        cursor: 'pointer',
                                        backgroundColor: channel.id === selectedChannel ? '#424242' : 'transparent',
                                        color: channel.id === selectedChannel ? '#F2F3F5' : '#949BA4',
                                        '&:hover': {
                                            backgroundColor: channel.id === selectedChannel ? '#0C0C0C' : '#35373C',
                                            color: '#F2F3F5'
                                        }
                                    })}
                                    onClick={() => setSelectedChannel(channel.id)}
                                >
                                    <IconHash size={20} style={{ color: 'inherit' }}/>
                                    <Text size="sm" style={{ color: 'inherit' }}>{channel.name}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Box>
                </ScrollArea>
            </Box>

            {/* Chat Area */}
            <Flex direction="column" style={{ flex: 1, backgroundColor: '#0C0C0C' }}>
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
                                <ChatInput channelId={selectedChannel} />
                            </>
                        )}
                    </>
                ) : (
                    <Flex align="center" justify="center" h="100%">
                        <Text c="#949BA4">Select a channel to view messages</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
} 