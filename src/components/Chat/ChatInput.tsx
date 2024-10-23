'use client'

import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { Flex, TextInput, ActionIcon, Box } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconCirclePlusFilled, IconGif, IconMoodHappyFilled } from "@tabler/icons-react";
import axios from "axios";
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function ChatInput({user}:{user: User})
{
    const { mutate } = useSWRConfig()
    const [pickerOpened, setPickerOpened] = useState(false);
    const ref = useClickOutside(() => setPickerOpened(false));
    const [textValue, setTextValue] = useState("");
    const params = useParams<{ id: string; }>()

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && textValue.trim() !== '') {
          const newMessage: Message = {
            id: Number(Date.now().toString()),
            content: textValue,
            author:user,
            authorId: user.id,
            timestamp: new Date(),
          };
          
          mutate<unknown>([`/api/chat/`, `${params.id}`],(prevData:{messages:Message[]})=>{
            return { messages: [...prevData.messages, newMessage] };
          },{revalidate:false});

            try {
              const response = await axios.post(`/api/chat/${params.id}`, {
                content: textValue,
              });
        
              if (response.status === 201)
                setTextValue('');
              else
                console.error('Failed to send message');
            } catch (error) {
              console.error('Error sending message', error);
            }
          }
      };

    return <>
      <Flex p={20} pt={0} align='start' pos='absolute' bottom={0} mih={80} h={80} w="100%"> 
            <TextInput onKeyDown={handleKeyPress} onChange={(event) => setTextValue(event.currentTarget.value)} value={textValue} styles={{input:{backgroundColor:'var(--mantine-color-dark-4)'}}} size={'lg'} w="100%" leftSection={<IconCirclePlusFilled size={30}/>} placeholder="Message @jd"/>
            <Flex right={25} bottom={35} bg={'dark.4'} pos='absolute' miw={80}>
                <ActionIcon h={40} w={40}  variant='transparent'><IconGif size={30}/></ActionIcon>
                <ActionIcon onClick={()=>setPickerOpened(true)} h={40} w={40}  variant='transparent'><IconMoodHappyFilled size={30}/></ActionIcon>       
            </Flex>
        </Flex>
        
        <Box pos='absolute' right={20} bottom={100} ref={ref}>
                <EmojiPicker onEmojiClick={(data)=>{setTextValue(textValue + data.emoji)}} theme={Theme.DARK} open={pickerOpened} />
        </Box>
    </>
}