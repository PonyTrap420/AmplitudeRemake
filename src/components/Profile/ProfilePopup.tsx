'use client'

import { User } from "@/types/User";
import { Box, Button, Divider, Flex, Avatar,Indicator,Text,Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCircleMinus, IconEdit, IconId } from "@tabler/icons-react";

export default function ProfilePopup({user}: {user:User})
{
    const clipboard = useClipboard({ timeout: 500 });

    return <Flex direction='column' mb={5} h={430} w={330}>
        <Flex h={200} w={300}>
            <Box className="rounded-t-md" pos='absolute' h={100} top={0} left={0} bg='dark.2' w="100%"></Box>
            <Box mt={35}>
            <Indicator styles={{indicator:{border:'7px solid #2e2e2e'}}} withBorder size={35} color='green' offset={15} position='bottom-end'>
            <Avatar src={user.avatar} size={100}></Avatar></Indicator>
            </Box>
        </Flex>
            <Title c='white' size="h3">{user.displayName}</Title>
            <Text size="lg" mb={15}>{user.username}</Text>
        <Flex gap={20} direction={'column'}>
            <Flex bg={'dark.7'} className="rounded-lg" p={10} direction={'column'}>
                <Button size='md' fw='normal'  pl={5} variant='subtle' justify='start' leftSection={<IconEdit/>}>Edit Profile</Button>
                <Divider mt={10} mb={10} orientation='horizontal' size={2}></Divider>
                <Button size='md' fw='normal'  pl={5} variant='subtle' justify='start' leftSection={<IconCircleMinus/>}>Do Not Disturb</Button>

            </Flex>
            
            <Flex bg={'dark.7'} className= "rounded-lg" p={10} direction={'column'}>
            <Button  onClick={() => clipboard.copy(user.id)} size='md' fw='normal' pl={5} variant='subtle' justify='start' leftSection={<IconId/>}>Copy User ID</Button>
            </Flex>
        </Flex>
    </Flex>
}