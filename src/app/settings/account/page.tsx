'use server'

import EditField from "@/components/Other/EditField";
import { getCurrentUser } from "@/services/userServices";
import { Button, Flex, Title, Text, Avatar, Group, Stack } from "@mantine/core";
import Link from "next/link";

export default async function MyAccount() {
    const user = await getCurrentUser();

    if(!user)
        return null;

    return <>
        <Title size='h3' mb="md">My Account</Title>
        
        <Flex bg='dark.6' w={"60%"} direction="column" p="md" mb="xl" style={{ borderRadius: 8 }}>
                <Flex justify="space-between" align="center" mb="lg">
                <Group>
                    <Avatar 
                        src={user?.avatar} 
                        size="xl" 
                        radius="xl"
                    >
                        {(user?.displayName)?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack gap={0}>
                        <Text fw={700} size="lg">{user?.username}</Text>
                        <Text size="sm" c="dimmed">#{user?.id.slice(0, 6)}</Text>
                    </Stack>
                </Group>
                <Link href={"/settings/profiles"}>
                    <Button 
                        variant="default" 
                        size="xs"
                        >
                        Edit User Profile
                    </Button>
                </Link>
            </Flex>

            <Stack 
                bg="dark.7" 
                p="md" 
                style={{ borderRadius: 8 }}
                gap="lg"
            >
                <EditField 
                    label="DISPLAY NAME" 
                    value={user?.displayName || 'Not set'}
                    hideReveal={true}
                />
                <EditField 
                    label="USERNAME" 
                    value={user?.username || 'Not set'}
                    hideReveal={true}
                />
                <EditField 
                    label="EMAIL" 
                    value={user?.email || 'Not set'}
                    hideReveal={false}
                />
                <EditField 
                    label="PHONE NUMBER" 
                    value={user?.phone?.toString() || 'Not set'}
                    hideReveal={false}
                />
            </Stack>
        </Flex>

        <Flex direction='column' gap={10}>
            <Title size='h4'>Password and Authentication</Title>
            <Button size="xs" w={170} variant='default'>Change Password</Button>
        </Flex>

        <Flex direction='column' gap={10} mt="xl">
            <Text c='grey' fw='bold' size='xs'>ACCOUNT REMOVAL</Text>
            <Button size="xs" w={170} variant='outline' color='#F23D3D'>Delete Account</Button>
        </Flex>
    </>;
}