'use client'

import { Message } from "@/types/Message";
import {  Avatar,Text, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import AttachmentContent from "./AttachmentContent";

export default function MessageBlock({message,isFirst,onContextMenu} : {message:Message,isFirst:boolean,onContextMenu: (e: React.MouseEvent) => void })
{

    const [date, setDate] = useState<Date>();
    useEffect(() => {
        setDate(new Date(message.timestamp));
      }, []);


    return (<Flex onContextMenu={onContextMenu} className="group rounded-lg hover:bg-[#323232]" align={message.attachments?.length==0?'center':'unset'} mt={isFirst?15:0} pb={message.attachments?.length!=0?10:0} mr={10} ml={-5} pl={6} p={2} gap={15}>
        {isFirst?
        <Avatar mt={message.attachments?.length!=0?5:0} size={40} className="hover:cursor-pointer"/>
        :
        <Text size="xs" className="opacity-0 group-hover:opacity-100" style={{textWrap:'nowrap'}} miw={40} maw={40}>{date?.toLocaleTimeString('en-US', {timeStyle:'short',hour12:true})}</Text>}
        <Flex w="70%" direction='column'>
            {isFirst?<Flex align='center' gap={10}>
                <Text c='white' className="hover:underline hover:cursor-pointer">{message.author.displayName}</Text>
                <Text size='xs'>{date?.toLocaleString('en-US')}</Text>
            </Flex>:null}
            <Text className="select-text">{message.content}</Text>
            {message.attachments&&
                <>
                <AttachmentContent urls={message.attachments}/>
                </>
            }
        </Flex>

    </Flex>)
}