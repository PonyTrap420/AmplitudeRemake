'use client'

import { User } from "@/types/User";
import { statusToColor } from "@/utils/user";
import { Flex,Text , Indicator, Avatar, ActionIcon, Space } from "@mantine/core";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

export default function DirectMessage({user}:{user:User|undefined})
{
    const [chats, setChats] = useLocalStorage<string[]>({
        key: "chats",
        defaultValue: [],
    });

    const {hovered, ref} = useHover();

    const handleRemoveChat = () => {
        if (!user) return;
        setChats(chats.filter(id => id !== user.id));
    };

    return  <Link href={`/channels/me/chat/`+user?.id}><Flex style={{cursor:'pointer'}} className="rounded-lg" mr={10} align='center' p={5} bg={hovered?'dark.4':''} ref={ref} gap={15}>
        {user?<>
        <Indicator processing={user?.status=='online'} withBorder size={14} color={statusToColor(user.status)} offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex w="70%" direction='column'>
            <Text>{user.displayName}</Text>
        </Flex>
        <Space miw={0} w="30%"/>
        <ActionIcon onClick={handleRemoveChat} variant='transparent' mr={10} size={20} display={hovered?'block':'none'}>
            <IconX/>
        </ActionIcon>
        </>:null}
    </Flex></Link>
}