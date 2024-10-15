'use client'

import { Message } from "@/types/Message";
import {  Avatar,Text, Flex, Space } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MessageBlock({message,isFirst,onContextMenu} : {message:Message,isFirst:boolean,onContextMenu: (e: React.MouseEvent) => void })
{

    const [date, setDate] = useState<Date>();
    useEffect(() => {
        setDate(new Date(message.timestamp));
      }, []);


    return (<Flex onContextMenu={onContextMenu} className="group rounded-lg hover:bg-[#323232]" mt={isFirst?15:0} mr={10} align='center' p={5} gap={15}>
        {isFirst?<Avatar size={40} className="hover:cursor-pointer"/>:<Text fz='xs' className="opacity-0 group-hover:opacity-100" style={{textWrap:'nowrap'}} miw={40} maw={40}>{date?.toLocaleTimeString('en-US', {timeStyle:'short',hour12:true})}</Text>}
        <Flex w="70%" direction='column'>
            {isFirst?<Flex gap={10}>
                <Text c='white' className="hover:underline hover:cursor-pointer">{message.author.global_name}</Text>
                <Text>{date?.toLocaleString('en-US')}</Text>
            </Flex>:null}
            <Text className="select-text font-sans">{message.content}</Text>
        </Flex>
        <Space miw={0} w="30%"/>
    </Flex>)
}