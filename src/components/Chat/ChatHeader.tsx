'use client'

import { Flex, Text, Indicator, Avatar, Space, ActionIcon, TextInput } from "@mantine/core";
import { IconPhoneCall, IconCameraFilled, IconPinnedFilled, IconUsersPlus, IconSearch, IconInbox, IconHelpCircleFilled, IconHash } from "@tabler/icons-react";
import CreateDM from "../Other/CreateDM";
import { statusToColor } from "@/utils/user";
import { User } from "@/types/User";

type ChatHeaderProps = {
    type: 'channel' | 'direct';
    name?: string;    // For channels
    user?: User;      // For direct messages
}

export default function ChatHeader({ type, name, user }: ChatHeaderProps) {
    if (type === 'channel') {
        return (
            <Flex pr={10} mih={60} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
                <IconHash size={24} color="#949BA4"/>
                <Text style={{whiteSpace:'nowrap'}} size='xl'>{name}</Text>
                <Space miw={0} w="100%"/>
                <Flex gap={10} pr={0} justify='center' h={"100%"} align='center' p={20}>
                    <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search" rightSection={<IconSearch/>}></TextInput>
                    <ActionIcon h={50} w={50} variant='transparent'><IconPinnedFilled size={30}/></ActionIcon>
                    <ActionIcon h={50} w={50} variant='transparent'><IconInbox size={30}/></ActionIcon>
                </Flex>
            </Flex>
        );
    }

    if (!user) return null;

    return (
        <Flex pr={10} mih={60} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
            <Indicator processing={user.status=='online'} withBorder size={14} color={statusToColor(user.status)} offset={8} position='bottom-end'>
                <Avatar size={30}></Avatar>
            </Indicator>
            <Text style={{whiteSpace:'nowrap'}} size='xl'>{user.displayName}</Text>
            <Space miw={0} w="100%"/>
            <Flex gap={10} pr={0} justify='center' h={"100%"} align='center' p={20}>
                <ActionIcon h={50} w={50} variant='transparent'><IconPhoneCall size={30}/></ActionIcon>
                <ActionIcon h={50} w={50} variant='transparent'><IconCameraFilled size={30}/></ActionIcon>
                <ActionIcon h={50} w={50} variant='transparent'><IconPinnedFilled size={30}/></ActionIcon>
                <CreateDM>
                    <ActionIcon h={50} w={50} variant='transparent'><IconUsersPlus size={30}/></ActionIcon>
                </CreateDM>
                <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search" rightSection={<IconSearch/>}></TextInput>
                <ActionIcon h={50} w={50} variant='transparent'><IconInbox size={30}/></ActionIcon>
                <ActionIcon h={50} w={50} variant='transparent'><IconHelpCircleFilled size={30}/></ActionIcon>
            </Flex>
        </Flex>
    );
}