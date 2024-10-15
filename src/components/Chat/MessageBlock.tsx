
import { Message } from "@/types/Message";
import {  Avatar,Text, Flex, Space } from "@mantine/core";

export default function MessageBlock({message,isFirst} : {message:Message,isFirst:boolean})
{
    return (<Flex className="rounded-lg hover:bg-[#323232]" mt={isFirst?15:0} mr={10} align='center' p={5} gap={15}>
        {isFirst?<Avatar size={40} className="hover:cursor-pointer"/>:<Text fz='xs' style={{textWrap:'nowrap'}} miw={40} maw={40}>{new Date(message.timestamp).toLocaleTimeString([], {timeStyle: 'short'})}</Text>}
        <Flex w="70%" direction='column'>
            {isFirst?<Flex gap={10}>
                <Text c='white' className="hover:underline hover:cursor-pointer">{message.author.global_name}</Text>
                <Text>{new Date(message.timestamp).toLocaleString()}</Text>
            </Flex>:null}
            <Text className="select-text font-sans">{message.content}</Text>
        </Flex>
        <Space miw={0} w="30%"/>
    </Flex>)
}