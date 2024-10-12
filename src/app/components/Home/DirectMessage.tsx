'use client'

import { Flex,Text , Indicator, Avatar, ActionIcon, Space } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

export default function DirectMessage()
{
    const {hovered, ref} = useHover();

    return <Flex style={{cursor:'pointer'}} mr={10} align='center' p={5} bg={hovered?'dark.4':''} ref={ref} gap={15}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex w="70%" direction='column'>
            <Text>GROUP</Text>
            <Text >{Math.floor(Math.random() * 10) + 1} Members</Text>
        </Flex>
        <Space miw={0} w="30%"/>
        <ActionIcon variant='transparent' mr={10} size={20} display={hovered?'block':'none'}>
            <IconX/>
        </ActionIcon>
    </Flex>
}