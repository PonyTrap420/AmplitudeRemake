'use client'

import { Message } from "@/types/Message";
import MessageBlock from "@/components/Chat/MessageBlock";
import { Box, Divider, Flex, ScrollArea, Text } from "@mantine/core";
import ContextMenu, { ContextMenuButton } from "../Other/ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";
import { IconCopy, IconCornerUpLeft, IconCornerUpRight, IconPencil, IconPinFilled, IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import useSession from "@/hooks/useSession";

export default function Chat({ messages = [], channelId }: { messages?: Message[], channelId?:string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { clicked, setClicked, location, setLocation } = useContextMenu();

  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  useEffect(() => {
    const FetchSession = async () => {
      const currentUser = await useSession();
      setCurrentUserId(currentUser?.id);
    };
    
    FetchSession();
  }, []);

  function ContextClicked(e: React.MouseEvent, message: Message) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = window.devicePixelRatio || 1;

    setClicked(true);
    setSelectedMessage(message);
    setLocation({
      x: e.clientX - rect.left,
      y: e.pageY - (170 * (1 / scaleFactor)),
    });
  }

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    const endpoint = channelId
        ? `/api/channels/${channelId}/messages`
        : `/api/chat/${selectedMessage.id}`;

    try {
        if (channelId) {
            // For channel messages, send the message ID in the body
            await axios.delete(endpoint, { data: { messageId: selectedMessage.id } });

            await mutate(`/api/channels/${channelId}/messages`, 
                (prevData: Partial<Message>[] = []) => prevData.filter(msg => msg.id !== selectedMessage.id)
            );
        } else {
            // For direct messages, delete by ID in URL
            await axios.delete(endpoint);

            await mutate([`/api/chat/`, selectedMessage.id], 
                (prevData: { messages: Partial<Message>[] } = { messages: [] }) => ({
                    messages: prevData.messages.filter(msg => msg.id !== selectedMessage.id)
                })
            );
        }

        setClicked(false);
    } catch (error) {
        console.error('Error deleting message', error);
    }
  };

  function handleCopyMessage() {
    if (selectedMessage) {
      navigator.clipboard.writeText(selectedMessage.content);
      setClicked(false);
    }
  }

  useEffect(() => {
    if(selectedMessage)
    {
      setSelectedMessage(null)
      return;
    }
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'auto' });
    }
  }, [messages]);

  return (
    <>
   <ScrollArea viewportRef={viewport}>
      <Flex p={20} pt={5} w="100%" direction="column">
        {messages.length > 0 ? (
          messages.map((message: Message, index: number) => {
            const isFirst =
              index === 0 ||
              message.authorId !== messages[index - 1].authorId ||
              new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 3600000;

            // Check for a day difference
            const showDateDivider = index > 0 &&
              new Date(message.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();
            
            return (
              <Box key={index}>
                {showDateDivider && (
                  <Flex gap={2} align='center' justify="center" my={4}>
                    <Divider orientation='horizontal' w="100%"/>
                    <Text size='xs' style={{whiteSpace:'none', textWrap:'nowrap'}}>
                      {new Date(message.timestamp).toDateString()}
                    </Text>
                    <Divider orientation='horizontal' w="100%"/>
                  </Flex>
                )}
                <MessageBlock
                  onContextMenu={(e) => ContextClicked(e, message)}
                  isFirst={isFirst}
                  message={message}
                />
              </Box>
            );
          })
        ) : (
          <Text>No Messages</Text>
        )}
      </Flex>
    </ScrollArea>


      {clicked && selectedMessage ? (
      <ContextMenu location={location}>
        {selectedMessage.authorId === currentUserId && (
        <ContextMenuButton text="Edit Message" rightSection={<IconPencil size={16} />} />)}
        <ContextMenuButton text="Reply" rightSection={<IconCornerUpLeft size={16} />} />
        <ContextMenuButton text="Forward" rightSection={<IconCornerUpRight size={16} />} />
        <Divider orientation="horizontal" />

        <ContextMenuButton onClick={handleCopyMessage} text="Copy Text" rightSection={<IconCopy size={16} />} />
        <ContextMenuButton text="Pin Message" rightSection={<IconPinFilled size={16} />} />


        {selectedMessage.authorId === currentUserId && (<>
          <Divider orientation="horizontal" />
          <ContextMenuButton onClick={handleDeleteMessage} color="red" text="Delete Message" rightSection={<IconTrash size={16} />} />
          </>)}
      </ContextMenu>
    ) : null}

    </>
  );
}
