'use client'

import { Modal, TextInput, Divider, Text, Flex, Avatar, Button, ActionIcon, CopyButton, ScrollArea } from "@mantine/core";
import { IconSearch, IconCopy, IconCheck } from "@tabler/icons-react";
import { User } from "@/types/User";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

type InviteModalProps = {
    opened: boolean;
    onClose: () => void;
    serverName: string;
    serverId: string;
}

const fetchFriends = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
};

const fetchInvite = async (url: string) => {
    if (!url) return null;
    const res = await axios.get(url);
    return res.data;
};

export default function InviteModal({ opened, onClose, serverName, serverId }: InviteModalProps) {
    const [search, setSearch] = useState("");
    const [sentTo, setSentTo] = useState<Set<string>>(new Set());
    const { data: friends } = useSWR<User[]>('/api/friends?status=all', fetchFriends);
    const { data: invite, error: inviteError, isLoading: inviteLoading } = useSWR<{ code: string }>(
        opened ? `/api/server/${serverId}/invite` : null,
        fetchInvite
    );

    const inviteLink = invite?.code ? `${window.location.origin}/invite/${invite.code}` : 'Loading...';

    const filteredFriends = friends?.filter(friend => 
        friend.username.toLowerCase().includes(search.toLowerCase()) ||
        friend.displayName?.toLowerCase().includes(search.toLowerCase())
    );

    const handleInvite = async (userId: string) => {
        try {
            await axios.post(`/api/chat/${userId}`, { 
                content: `Hey! You've been invited to join ${serverName}! ${inviteLink}`
            });
            setSentTo(prev => new Set(prev).add(userId));
        } catch (error) {
            console.error('Failed to send invite:', error);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Invite friends to ${serverName}`}
            size="md"
            centered
            styles={{
                inner: { left: 0 },
            }}
        >
            <TextInput
                placeholder="Search for friends"
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                mb="md"
            />

            <Divider mb="md" />

            <ScrollArea 
                h={300}
                scrollbarSize={8}
                type="hover"
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
                <Flex direction="column">
                    {filteredFriends?.map(friend => (
                        <Flex 
                            key={friend.id} 
                            align="center" 
                            justify="space-between" 
                            p="xs"
                            className="hover:bg-[#2a2a2a]"
                            style={{ borderRadius: 4 }}
                        >
                            <Flex align="center" gap="sm">
                                <Avatar 
                                    src={friend.avatar} 
                                    radius="xl" 
                                    size={32}
                                />
                                <Text size="sm">{friend.displayName || friend.username}</Text>
                            </Flex>
                            <Button 
                                variant="subtle"
                                size="xs"
                                onClick={() => handleInvite(friend.id)}
                                disabled={sentTo.has(friend.id)}
                                c={sentTo.has(friend.id) ? 'grey' : 'green'}
                            >
                                {sentTo.has(friend.id) ? 'Sent!' : 'Invite'}
                            </Button>
                        </Flex>
                    ))}
                </Flex>
            </ScrollArea>

            <Text size="sm" fw={500}>Or send a server invite link to a friend</Text>
            
            <Flex align="center" gap="sm" mt="xs">
                <TextInput
                    value={inviteLoading ? 'Loading...' : inviteError ? 'Error loading invite' : inviteLink}
                    readOnly
                    style={{ flex: 1 }}
                    rightSection={
                        <CopyButton value={inviteLink} timeout={2000}>
                            {({ copied, copy }) => (
                                <ActionIcon 
                                    c={copied ? 'teal' : 'gray'} 
                                    onClick={copy}
                                    disabled={inviteLoading || !!inviteError}
                                >
                                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                </ActionIcon>
                            )}
                        </CopyButton>
                    }
                />
            </Flex>
            
            {inviteError && (
                <Text size="xs" c="red" mt="xs">
                    Failed to load invite link
                </Text>
            )}
            
            <Text size="xs" c="dimmed" mt="xs">
                Your invite link expires in 7 days
            </Text>
        </Modal>
    );
} 