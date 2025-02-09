'use client'

import { Box, ScrollArea, Text, Flex } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import { Channel } from "@/types/Channel";
import ServerContextMenu from "./ServerContextMenu";

type ServerSidebarProps = {
    serverName: string;
    serverId: string;
    channels: Channel[];
    selectedChannel: string | null;
    isOwner: boolean;
    onChannelSelect: (channelId: string) => void;
}

export default function ServerSidebar({ 
    serverName, 
    serverId,
    channels, 
    selectedChannel, 
    isOwner,
    onChannelSelect 
}: ServerSidebarProps) {
    return (
        <Box w={250} h="90%">
            <ServerContextMenu 
                serverName={serverName} 
                serverId={serverId}
                isOwner={isOwner} 
            />
            
            <ScrollArea h="calc(100% - 50px)" type="hover" scrollbarSize={8} 
                styles={{
                    root: { height: 'calc(100% - 50px)' },
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
                    <Text size="sm" c="#949BA4" fw={500} mb={8}>TEXT CHANNELS</Text>
                    
                    <Flex direction="column" gap={2}>
                        {channels.map((channel) => (
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
                                onClick={() => onChannelSelect(channel.id)}
                            >
                                <IconHash size={20} style={{ color: 'inherit' }}/>
                                <Text size="sm" style={{ color: 'inherit' }}>{channel.name}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </ScrollArea>
        </Box>
    );
} 