'use client'

import CreateDM from "@/app/components/CreateDM";
import { Avatar,Text, Flex, Indicator, ActionIcon, Space, TextInput, Box } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconInbox, IconHelpCircleFilled, IconSearch, IconPinnedFilled, IconCameraFilled, IconPhoneCall, IconUsersPlus, IconCirclePlusFilled, IconGif, IconMoodHappyFilled } from "@tabler/icons-react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Theme } from 'emoji-picker-react';

export default function Friends(){
    const [pickerOpened, setPickerOpened] = useState(false);
    const ref = useClickOutside(() => setPickerOpened(false));

    return <Flex direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
    <Flex pr={10} mih={60} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={30}></Avatar>
        </Indicator>
        <Text size='xl'>jd</Text>
        <Space miw={0} w="100%"/>
        <Flex gap={10} pr={0} justify='center' h={"100%"} align='center' p={20}>
            <ActionIcon h={50} w={50}  variant='transparent'><IconPhoneCall size={30}/></ActionIcon>
            <ActionIcon h={50} w={50}  variant='transparent'><IconCameraFilled size={30}/></ActionIcon>
            <ActionIcon h={50} w={50}  variant='transparent'><IconPinnedFilled size={30}/></ActionIcon>
            <CreateDM>
                <ActionIcon h={50} w={50} variant='transparent'><IconUsersPlus size={30}/></ActionIcon>
            </CreateDM>
            <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search" rightSection={<IconSearch/>}></TextInput>
            <ActionIcon h={50} w={50}  variant='transparent'><IconInbox size={30}/></ActionIcon>
            <ActionIcon h={50} w={50}  variant='transparent'><IconHelpCircleFilled size={30}/></ActionIcon>
        </Flex>
    </Flex>
    <Flex pos='relative' w="100%" h="100%" direction='column'>
        <Flex p={20} w="100%" direction='column'>

        </Flex>
        <Flex p={20} pt={0} pos='absolute' align='start' bottom={0} h={80} w="100%"> 
            <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-4)'}}} size={'lg'} w="100%" leftSection={<IconCirclePlusFilled size={30}/>} placeholder="Message @jd"/>
            <Flex pos='absolute' right={25} top={5} bg={'dark.4'} miw={80}>
                <ActionIcon h={40} w={40}  variant='transparent'><IconGif size={30}/></ActionIcon>
                <ActionIcon onClick={()=>setPickerOpened(true)} h={40} w={40}  variant='transparent'><IconMoodHappyFilled size={30}/></ActionIcon>       
            </Flex>
        </Flex>
        <Box pos='absolute' right={20} bottom={100} ref={ref}>
                <EmojiPicker theme={Theme.DARK} open={pickerOpened} />
        </Box>
    </Flex>
</Flex>
}