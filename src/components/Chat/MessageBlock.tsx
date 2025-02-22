'use client'

import { Message } from "@/types/Message";
import { Avatar, Text, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import AttachmentContent from "./AttachmentContent";

export default function MessageBlock({ message, isFirst, onContextMenu }: { message: Message, isFirst: boolean, onContextMenu: (e: React.MouseEvent) => void }) {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        setDate(new Date(message.timestamp));
    }, []);

    // Function to extract the file extension from URL, ignoring query parameters
    const getExtension = (url: string) => {
        const extMatch = url.split(/[\?&#]/)[0].match(/\.(jpeg|jpg|gif|png|webp|mp4|webm|ogg)$/i);
        return extMatch ? extMatch[0] : null;
    };

    const isImage = (url: string) => {
        return /\.(jpeg|jpg|gif|png|webp)$/i.test(getExtension(url) || "");
    };

    const isVideo = (url: string) => {
        return /\.(mp4|webm|ogg)$/i.test(getExtension(url) || "");
    };

    // Function to convert links into anchor tags or media
    const renderMessageContent = (content: string) => {
        const urlRegex = /https?:\/\/[^\s]+/g;
        const parts = content.split(urlRegex).map((part, i) => {
            const match = content.match(urlRegex)?.[i];
            if (match) {
                if (isImage(match)) {
                    return <AttachmentContent key={`image-${i}`} urls={[match]} />;
                } else if (isVideo(match)) {
                    return <AttachmentContent key={`video-${i}`} urls={[match]} />;
                } else {
                    return (
                        <a 
                            key={`link-${i}`} 
                            href={match} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline"
                        >
                            {match}
                        </a>
                    );
                }
            }
            return <span key={`text-${i}`}>{part}</span>;
        });

        // If there are no links, just render the content as regular text
        return urlRegex.test(content) ? parts : <Text className="select-text">{content}</Text>;
    };

    return (
        <Flex 
            onContextMenu={onContextMenu} 
            className="group rounded-lg hover:bg-[#323232]" 
            align={message.attachments?.length === 0 ? 'center' : 'unset'} 
            mt={isFirst ? 15 : 0} 
            pb={message.attachments?.length !== 0 ? 10 : 0} 
            mr={10} 
            ml={-5} 
            pl={6} 
            p={2} 
            gap={15}
        >
            {isFirst ? (
                <Flex mt={3} style={{alignSelf:'stretch'}} h="100%">
                    <Avatar mt={message.attachments?.length !== 0 ? 5 : 0} size={40} className="hover:cursor-pointer" />
                </Flex>
            ) : (
                <Text size="xs" className="opacity-0 group-hover:opacity-100" style={{ textWrap: 'nowrap' }} miw={40} maw={40}>
                    {date?.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: true })}
                </Text>
            )}
            <Flex w="70%" direction="column">
                {isFirst && (
                    <Flex align="center" gap={10}>
                        <Text c="white" className="hover:underline hover:cursor-pointer">{message.author.displayName}</Text>
                        <Text size="xs">{date?.toLocaleString('en-US')}</Text>
                    </Flex>
                )}
                {renderMessageContent(message.content)}
                {message.attachments && <AttachmentContent urls={message.attachments} />}
            </Flex>
        </Flex>
    );
}
