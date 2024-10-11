import { Flex,Text , Indicator, Avatar } from "@mantine/core";

export default function DirectMessage()
{
    return <Flex gap={15}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex direction='column'>
            <Text>GROUP</Text>
            <Text>{Math.floor(Math.random() * 10) + 1} Members</Text>
        </Flex>
    </Flex>
}