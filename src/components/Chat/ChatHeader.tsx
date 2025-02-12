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
            <Flex pr={10} mih={45} mah={45} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={10} p={10} w="100%" align='center' justify='start'>
                <IconHash size={24} color="#949BA4"/>
                <Text style={{whiteSpace:'nowrap'}} size='md'>{name}</Text>
                <Space miw={0} w="100%"/>
                <Flex gap={0} pr={0} justify='center' h={"100%"} align='center' p={20}>
                    <TextInput size="xs" styles={{input:{backgroundColor:'var(--mantine-color-dark-8)', border:0}}} placeholder="Search" rightSection={<IconSearch/>}></TextInput>
                    <ActionIcon h={40} w={40} variant='transparent'><IconPinnedFilled size={20}/></ActionIcon>
                    <ActionIcon h={40} w={40} variant='transparent'><IconInbox size={20}/></ActionIcon>
                </Flex>
            </Flex>

        );
    }

    if (!user) return null;

    return (
        <Flex pr={10} mih={45} mah={45} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={10} p={10} w="100%" align='center' justify='start'>
            <Indicator processing={user.status=='online'} withBorder size={12} color={statusToColor(user.status)} offset={3} position='bottom-end'>
                <Avatar size={25}></Avatar>
            </Indicator>
            <Text style={{whiteSpace:'nowrap'}} size='md'>{user.displayName}</Text>
            <Space miw={0} w="100%"/>
            <Flex gap={5} pr={0} justify='center' h={"100%"} align='center' p={20}>
                <ActionIcon h={40} w={40} variant='transparent'><IconPhoneCall size={20}/></ActionIcon>
                <ActionIcon h={40} w={40} variant='transparent'><IconCameraFilled size={20}/></ActionIcon>
                <ActionIcon h={40} w={40} variant='transparent'><IconPinnedFilled size={20}/></ActionIcon>
                <CreateDM>
                    <ActionIcon h={40} w={40} variant='transparent'><IconUsersPlus size={20}/></ActionIcon>
                </CreateDM>

                <TextInput size='xs' styles={{input:{backgroundColor:'var(--mantine-color-dark-8)', border:0}}} placeholder="Search" rightSection={<IconSearch/>}></TextInput>
                <ActionIcon h={40} w={40} variant='transparent'><IconInbox size={20}/></ActionIcon>
                <ActionIcon h={40} w={40} variant='transparent'><IconHelpCircleFilled size={20}/></ActionIcon>
            </Flex>
        </Flex>


    );
}