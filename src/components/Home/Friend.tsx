'use client'

import { User } from "@/types/User";
import { ActionIcon,Text, Avatar, Flex, Indicator, Space, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconMessage, IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";

export default function Friend({friend} : {friend:User})
{
    const {hovered, ref} = useHover();
    const id = 2;

    return <>
    <Flex style={{borderBottom:'2px solid #474747', cursor:'pointer'}} ref={ref} p={10} gap={15} bg={hovered?'dark.4':''}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex direction='column'>
            <Text>{friend.displayName}</Text>
            <Text>{friend.id}</Text>
        </Flex>
        <Space miw={0} w="100%"/>
        <Flex mr={20} gap={10}>
            <Tooltip label="Message">
                <Link href={`/home/chat/`+id}>
                    <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconMessage/></ActionIcon>
                </Link>
            </Tooltip>
            <Tooltip label="More">
                <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconDotsVertical/></ActionIcon>
            </Tooltip>
        </Flex>
    </Flex>
    </>
}