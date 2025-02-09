'use client'

import { Box, ScrollArea, Text, Flex, ActionIcon, Divider } from "@mantine/core";
import { IconHash, IconVolume, IconPlus, IconCheck, IconPencil, IconTrash, IconUserPlus, IconCopy } from "@tabler/icons-react";
import { Channel } from "@/types/Channel";
import { Category } from "@/hooks/useServer";
import ServerContextMenu from "./ServerContextMenu";
import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import { useSWRConfig } from 'swr';
import axios, { AxiosError } from "axios";
import ContextMenu, { ContextMenuButton } from "../Other/ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";

type ServerSidebarProps = {
    serverName: string;
    serverId: string;
    channels: Channel[];
    categories: Category[];
    selectedChannel: string | null;
    isOwner: boolean;
    onChannelSelect: (channelId: string) => void;
}

export default function ServerSidebar({ 
    serverName, 
    serverId,
    channels, 
    categories,
    selectedChannel, 
    isOwner,
    onChannelSelect 
}: ServerSidebarProps) {
    const { mutate } = useSWRConfig();
    const [createChannelOpened, setCreateChannelOpened] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const uncategorizedChannels = channels.filter(channel => !channel.categoryId);
    const { clicked, setClicked, location, setLocation } = useContextMenu();
    const [selectedItem, setSelectedItem] = useState<{
        type: 'channel' | 'category';
        id: string;
    } | null>(null);

    const handleContextMenu = (e: React.MouseEvent, type: 'channel' | 'category', id: string) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleFactor = window.devicePixelRatio || 1;
        setLocation({ x: e.clientX-rect.left, y: e.pageY - (100*(1/scaleFactor)) });
        setSelectedItem({ type, id });
        setClicked(true);

    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        try {
            if (selectedItem.type === 'channel') {
                await axios.delete(`/api/server/${serverId}/channels`, {
                    data: { channelId: selectedItem.id }
                });
            } else {
                await axios.delete(`/api/server/${serverId}/categories`, {
                    data: { categoryId: selectedItem.id }
                });
            }
            await mutate(`/api/server/${serverId}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Failed to delete:', error.response?.data?.error);
            }
        }
        setClicked(false);
    };

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
                    {uncategorizedChannels.length > 0 && (
                        <>
                            <Text size="xs" c="#949BA4" fw={500} mb={4}>TEXT CHANNELS</Text>
                            <Flex direction="column" gap={1}>
                                {uncategorizedChannels.map((channel) => (
                                    <Flex
                                        key={channel.id}
                                        align="center"
                                        gap={6}
                                        p={6}
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
                                        onContextMenu={(e) => handleContextMenu(e, 'channel', channel.id)}
                                    >
                                        {channel.type === 'voice' ? (
                                            <IconVolume size={16} style={{ color: 'inherit' }}/>
                                        ) : (
                                            <IconHash size={16} style={{ color: 'inherit' }}/>
                                        )}
                                        <Text size="sm" style={{ color: 'inherit', fontSize: '13px' }}>{channel.name}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    {categories.map(category => (
                        <Box 
                            key={category.id} 
                            mt={10} 
                            mb={16}
                        >
                            <Flex align="center" justify="space-between" mb={4} onContextMenu={(e) => handleContextMenu(e, 'category', category.id)}>
                                <Text  size="xs" c="#949BA4" fw={500}>{category.name}</Text>
                                {isOwner && (
                                    <ActionIcon 
                                        variant="subtle" 
                                        color="gray" 
                                        size="xs"
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setCreateChannelOpened(true);
                                        }}
                                    >
                                        <IconPlus size={14} />
                                    </ActionIcon>
                                )}
                            </Flex>
                            <Flex direction="column" gap={1}>
                                {category.channels.map((channel) => (
                                    <Flex
                                        key={channel.id}
                                        align="center"
                                        gap={6}
                                        p={6}
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
                                        onContextMenu={(e) => handleContextMenu(e, 'channel', channel.id)}
                                    >
                                        {channel.type === 'voice' ? (
                                            <IconVolume size={16} style={{ color: 'inherit' }}/>
                                        ) : (
                                            <IconHash size={16} style={{ color: 'inherit' }}/>
                                        )}
                                        <Text size="sm" style={{ color: 'inherit', fontSize: '13px' }}>{channel.name}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Box>
                    ))}
                </Box>
            </ScrollArea>

            <CreateChannelModal
                opened={createChannelOpened}
                onClose={() => {
                    setCreateChannelOpened(false);
                    setSelectedCategory(null);
                }}
                serverId={serverId}
                categoryId={selectedCategory}
                onChannelCreated={() => mutate(`/api/server/${serverId}`)}
            />

            {clicked && selectedItem && (
                <ContextMenu location={location}>
                    {selectedItem.type === 'channel' ? (
                        <>
                            <ContextMenuButton text="Mark As Read" rightSection={<IconCheck size={16}/>}/>
                            <Divider orientation='horizontal'/>
                            <ContextMenuButton text="Invite People" rightSection={<IconUserPlus size={16}/>} color="blue"/>
                            <Divider orientation='horizontal'/>

                            <ContextMenuButton text="Edit Channel" rightSection={<IconPencil size={16}/>}/>
                            <ContextMenuButton text="Duplicate Channel" rightSection={<IconCopy size={16}/>}/>


                            <ContextMenuButton 
                                text="Delete Channel" 
                                rightSection={<IconTrash size={16}/>}
                                color="red"
                                onClick={handleDelete}
                            />

                            <Divider orientation='horizontal'/>
                            <ContextMenuButton 
                                text="Copy ID" 
                                rightSection={<IconHash size={16}/>}
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedItem.id);
                                    setClicked(false);
                                }}


                            />
                        </>
                    ) : (
                        <>
                            <ContextMenuButton text="Mark As Read" rightSection={<IconCheck size={16}/>}/>
                            <Divider orientation='horizontal'/>
                            <ContextMenuButton text="Edit Category" rightSection={<IconPencil size={16}/>}/>
                            <ContextMenuButton 


                                text="Delete Category" 
                                rightSection={<IconTrash size={16}/>}
                                color="red"
                                onClick={handleDelete}

                            />
                        </>

                    )}
                </ContextMenu>
            )}
        </Box>
    );
} 