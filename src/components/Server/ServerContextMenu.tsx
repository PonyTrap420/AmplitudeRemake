'use client'

import { Menu, UnstyledButton, Group, Title } from "@mantine/core";
import { IconChevronDown, IconSettings, IconUserPlus, IconTrash, IconLogout, IconFolderPlus, IconMessagePlus } from "@tabler/icons-react";

type ServerContextMenuProps = {
    serverName: string;
    isOwner: boolean;
}

export default function ServerContextMenu({ serverName, isOwner }: ServerContextMenuProps) {
    return (
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
                    >
                        Delete Server
                    </Menu.Item>
                ) : (
                    <Menu.Item
                        color="red"
                        leftSection={<IconLogout size={16} />}
                    >
                        Leave Server
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
} 