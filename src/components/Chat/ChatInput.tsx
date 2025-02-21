'use client'

import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { Flex, TextInput, ActionIcon, Box, ScrollArea } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconGif, IconMoodHappyFilled } from "@tabler/icons-react";
import axios from "axios";
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import Attachments from "./AttachmentsDropzone";
import Attachment from "./Attachment";
import { FileWithPath } from "@mantine/dropzone";

type ChatInputProps = {
    channelId?: string;    // For channels
    otherUser?: User;      // For direct messages
    user?: User;
}

export type AttachmentType = {
    id: string;
    file: FileWithPath;
}

export default function ChatInput({ channelId, user, otherUser }: ChatInputProps)
{
    const { mutate } = useSWRConfig()
    const [pickerOpened, setPickerOpened] = useState(false);

    const ref = useClickOutside(() => setPickerOpened(false));
    const [textValue, setTextValue] = useState("");
    const params = useParams<{ id: string; }>()

    const [attachments, setAttachments] = useState<AttachmentType[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleDrop = (newFiles: FileWithPath[]) => {
        const filesWithId = newFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
        }));
        setAttachments((prevFiles) => [...prevFiles, ...filesWithId]);
    };

    const removeAttachment = (id: string) => {
        setAttachments((prevFiles) => prevFiles.filter((attachment) => attachment.id !== id));
    };

    const uploadFiles = async (files: AttachmentType[]) => {
        const formData = new FormData();
        
        files.forEach((file) => {
            formData.append('files', file.file);
        });

        try {
        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            return response.data.fileUrls;
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    };

    const placeholder = channelId 
        ? "Message #" + channelId 
        : otherUser 
            ? `Message @${otherUser.displayName}`
            : "Message";

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && (textValue.trim() !== ''|| attachments.length > 0)) {
            setIsUploading(true);
            const endpoint = channelId ? `/api/channels/${channelId}/messages` : `/api/chat/${params.id}`;

        try {
            let uploadedFileUrls: string[] = [];
            if (attachments.length > 0) {
                uploadedFileUrls = await uploadFiles(attachments);
            }

            const newMessage: Partial<Message> = {
                id: Number(Date.now().toString()),
                content: textValue,
                authorId: user?.id,
                author: user ? {
                    id: user.id,
                    username: user.username,
                    displayName: user.displayName,
                    avatar: user.avatar,
                    banner: user.banner,
                    accent_color: user.accent_color,
                    banner_color: user.banner_color,
                    status: user.status  
                }: undefined,
                pinned: false,
                meantion_everyone: false,
                mentions: [],
                attachments: [],
                embeds: [],
                timestamp: new Date(),
            };
            
            await axios.post(endpoint, { content: textValue, attachments: uploadedFileUrls });

            if (channelId) {
                await mutate(`/api/channels/${channelId}/messages`, 
                    (prevData: Partial<Message>[] = []) => [...prevData, newMessage]
                );
            } else {
                await mutate([`/api/chat/`, params.id], 
                    (prevData: { messages: Partial<Message>[] } = { messages: [] }) => ({
                        messages: [...prevData.messages, newMessage]
                    })
                );
            }
            setTextValue('');
            setAttachments([]);

            } catch (error) {
                console.error('Error sending message', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return <>
      <Flex gap={5} direction={'column'} p={20} pt={0} align='start' pos='absolute' bottom={0} mih={attachments.length!=0?275:70} h={attachments.length!=0?275:70} w="100%"> 
            {attachments.length!=0?
            <ScrollArea scrollbars={'x'} h={200} w={"100%"} p={10} className="rounded" bg={'var(--mantine-color-dark-4)'}>
                    <Flex gap={15}>
                    {attachments.map((attachment,index) => (
                        <Attachment key={index} attachment={attachment} handleRemove={removeAttachment} />
                    ))}
                    </Flex>
            </ScrollArea>:null}
            <TextInput disabled={isUploading} onKeyDown={handleKeyPress} onChange={(event) => setTextValue(event.currentTarget.value)} value={textValue} styles={{input:{backgroundColor:'var(--mantine-color-dark-4)'}}} size='md' w="100%" leftSection={
                <Attachments onDrop={handleDrop}/>
            } placeholder={placeholder}/>
            <Flex right={25} bottom={29} bg={'dark.4'} pos='absolute' miw={80}>
                <ActionIcon h={40} w={40}  variant='transparent'><IconGif size={25}/></ActionIcon>
                <ActionIcon onClick={()=>setPickerOpened(true)} h={40} w={40}  variant='transparent'><IconMoodHappyFilled size={25}/></ActionIcon>       
            </Flex>
        </Flex>
        
        <Box pos='absolute' right={20} bottom={100} ref={ref}>
                <EmojiPicker onEmojiClick={(data)=>{setTextValue(textValue + data.emoji)}} theme={Theme.DARK} open={pickerOpened} />
        </Box>
    </>
}