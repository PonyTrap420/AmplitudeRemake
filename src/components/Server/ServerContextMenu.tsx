'use client'

import { Menu, UnstyledButton, Group, Title, Modal, Text, Button, Stack } from "@mantine/core";
import { IconChevronDown, IconSettings, IconUserPlus, IconTrash, IconLogout, IconFolderPlus, IconMessagePlus } from "@tabler/icons-react";
import { useState } from "react";
import InviteModal from "./InviteModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSWRConfig } from 'swr';

type ServerContextMenuProps = {
    serverName: string;
    serverId: string;
    isOwner: boolean;
}

export default function ServerContextMenu({ serverName, serverId, isOwner }: ServerContextMenuProps) {
    const [inviteModalOpened, setInviteModalOpened] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const router = useRouter();
    const { mutate } = useSWRConfig();

    const handleServerAction = async () => {
        try {
            await axios.delete(`/api/server/${serverId}`);
            await mutate('/api/server');
            router.push('/channels/me');
            setDeleteModalOpened(false);
        } catch (error: any) {
            console.error('Failed to perform server action:', error);
        }
    };

    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <UnstyledButton 
                        w="100%" 
                        p="md"
                        style={{
                            borderBottom: '2px solid var(--mantine-color-dark-7)',
                            '&:hover': { backgroundColor: '#2a2a2a' }
                        }}
                    >
                        <Group justify="space-between">
                            <Title order={4} c="#F2F3F5">{serverName}</Title>
                            <IconChevronDown size={20} color="#949BA4" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={<IconUserPlus size={16} />}
                        color="blue"
                        onClick={() => setInviteModalOpened(true)}
                    >
                        Invite People
                    </Menu.Item>
                    
                    <Menu.Divider />
                    
                    <Menu.Item
                        leftSection={<IconSettings size={16} />}
                    >
                        Server Settings
                    </Menu.Item>
                    
                    <Menu.Item
                        leftSection={<IconMessagePlus size={16} />}
                    >
                        Create Channel
                    </Menu.Item>
                    
                    <Menu.Item
                        leftSection={<IconFolderPlus size={16} />}
                    >
                        Create Category
                    </Menu.Item>
                    
                    <Menu.Divider />
                    
                    {isOwner ? (
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash size={16} />}
                            onClick={() => setDeleteModalOpened(true)}
                        >
                            Delete Server
                        </Menu.Item>
                    ) : (
                        <Menu.Item
                            color="red"
                            leftSection={<IconLogout size={16} />}
                            onClick={handleServerAction}
                        >
                            Leave Server
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>

            <InviteModal
                opened={inviteModalOpened}
                onClose={() => setInviteModalOpened(false)}
                serverName={serverName}
                serverId={serverId}
            />

            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="Delete Server"
                centered
                styles={{
                    inner: { left: 0 }
                }}
            >
                <Stack>
                    <Text>Are you sure you want to delete <strong>{serverName}</strong>? This action cannot be undone.</Text>
                    <Button 
                        color="red" 
                        onClick={handleServerAction}
                        fullWidth
                    >
                        Delete Server
                    </Button>
                </Stack>
            </Modal>
        </>
    );
} 