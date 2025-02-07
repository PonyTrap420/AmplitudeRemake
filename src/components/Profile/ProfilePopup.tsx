'use client'

import { User } from "@/types/User";
import { Box, Button, Divider, Flex, Avatar,Indicator,Text,Title, MenuTarget, Menu, MenuDivider } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { $Enums } from "@prisma/client";
import { IconArrowRight, IconCircle, IconCircleFilled, IconCircleMinus, IconEdit, IconId, IconMoonFilled } from "@tabler/icons-react";
import axios from "axios";


function getStatus(status: string) {
    switch (status) {
        case "online":
            return (
                <>
                    <IconCircleFilled style={{marginRight:10}} size={15} color="#23a55a" /> Online
                </>
            );
        case "idle":
            return (
                <>
                    <IconMoonFilled style={{marginRight:10}} size={15} color="#f0b232" /> Idle
                </>
            );
        case "dnd":
            return (
                <>
                    <IconCircleMinus style={{marginRight:10}} size={15} color="#f23f43" /> Do Not Disturb
                </>
            );
        case "offline":
            return (
                <>
                    <IconCircle style={{marginRight:10}} size={15} color="gray" /> Invisible
                </>
            );
        default:
            return <>Unknown</>;
    }
}

export default function ProfilePopup({ user, mutate }: { user: User; mutate: () => void })
{
    const clipboard = useClipboard({ timeout: 500 });
    
    const handleStatusChange = async (newStatus: $Enums.UserStatus) => {
        try {
            await axios.patch(`/api/user`, {
                id: user.id,
                status: newStatus,
            });

            mutate()
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

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
                <Menu position="right" >
                    <MenuTarget>
                        <Button size='md' fw='normal' rightSection={<IconArrowRight/>} pl={5} variant='subtle' justify='space-between'>{getStatus(user.status)}</Button>
                    </MenuTarget>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => handleStatusChange("online")} leftSection={<IconCircleFilled size={13} color="#23a55a"/>}>Online</Menu.Item>
                        <MenuDivider/>
                        <Menu.Item onClick={() => handleStatusChange("idle")}  leftSection={<IconMoonFilled size={13} color="#f0b232"/>}>Idle</Menu.Item>
                        <Menu.Item onClick={() => handleStatusChange("dnd")}  leftSection={<IconCircleMinus size={13} color='#f23f43'/>}>Do Not Disturb</Menu.Item>
                        <Menu.Item onClick={() => handleStatusChange("offline")} leftSection={<IconCircle size={13} color='gray'/>}>Invisible</Menu.Item>
                    </Menu.Dropdown>
                </Menu>

            </Flex>
            
            <Flex bg={'dark.7'} className= "rounded-lg" p={10} direction={'column'}>
            <Button  onClick={() => clipboard.copy(user.id)} size='md' fw='normal' pl={5} variant='subtle' justify='start' leftSection={<IconId/>}>Copy User ID</Button>
            </Flex>
        </Flex>
    </Flex>
}