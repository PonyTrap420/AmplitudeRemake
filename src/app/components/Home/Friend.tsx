import { ActionIcon,Text, Avatar, Divider, Flex, Indicator, Space, Tooltip } from "@mantine/core";
import { IconMessage, IconDotsVertical } from "@tabler/icons-react";

export default function Friend()
{
    return <>
    <Flex gap={15}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex direction='column'>
            <Text>JD</Text>
            <Text>online</Text>
        </Flex>
        <Space miw={0} w="100%"/>
        <Flex mr={20}>
            <Tooltip label="Message">
                <ActionIcon radius='xl' size={45}><IconMessage/></ActionIcon>
            </Tooltip>
            <Tooltip label="More">
                <ActionIcon radius='xl' size={45}><IconDotsVertical/></ActionIcon>
            </Tooltip>
        </Flex>
    </Flex>
    <Divider size={3} orientation='horizontal'/>
    </>
}