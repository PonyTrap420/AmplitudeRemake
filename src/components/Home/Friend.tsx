'use client'

import { ActionIcon,Text, Avatar, Flex, Indicator, Space, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconMessage, IconDotsVertical } from "@tabler/icons-react";

export default function Friend()
{
    const {hovered, ref} = useHover();

    return <>
    <Flex style={{borderBottom:'2px solid #474747', cursor:'pointer'}} ref={ref} p={10} gap={15} bg={hovered?'dark.4':''}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex direction='column'>
            <Text>JD</Text>
            <Text>online</Text>
        </Flex>
        <Space miw={0} w="100%"/>
        <Flex mr={20} gap={10}>
            <Tooltip label="Message">
                <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconMessage/></ActionIcon>
            </Tooltip>
            <Tooltip label="More">
                <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconDotsVertical/></ActionIcon>
            </Tooltip>
        </Flex>
    </Flex>
    </>
}