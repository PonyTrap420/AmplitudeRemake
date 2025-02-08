'use client'

import {  ActionIcon, Button, Flex, Modal, ScrollArea, Space, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";

function CreateServerTemplate({name, icon, onclick}:{name:string, icon:string, onclick:()=>void})
{
    return <Flex onClick={onclick} className="bg-none hover:bg-[#2a2a2a]" p={10} bd={'1px solid #3d3d3d'} style={{borderRadius:5,cursor:'pointer'}} align='center' justify='space-between'>
    <Flex align='center' gap={5}> 
        <Image src={`/svg/${icon}`} width={40} height={40} alt="create-server-own"></Image>
        <Text fw='bolder' size="sm">{name}</Text>
    </Flex>
   <ActionIcon bg='none' c={'#3d3d3d'} opacity={0.7}><IconArrowRight/></ActionIcon>
</Flex>
}

export default function CreateServer()
{
    const [opened, { open, close }] = useDisclosure(false);

    return <>
        <div className="cursor-pointer transition-all duration-200 p-2.5 bg-[#353636] rounded-[100%] ease hover:bg-[#1a56d9] hover:rounded-[35%]">
            <IconPlus onClick={open} color="white" size={40}/>
        </div>

        <Modal centered styles={{inner:{left:0}}} opened={opened} onClose={close} withCloseButton={false}>
            <ActionIcon size='sm' onClick={close} opacity={0.7} bg='none' pos='absolute' right={15}>
                <IconX/>
            </ActionIcon>
            <Flex gap={10} direction='column' align='center'>
                <Title size='lg'>Create Your Server</Title>
                <Text size='sm' opacity={0.7} ta='center'>Your server is where you and your friends hang out.
                Make yours and start talking.</Text>
                <ScrollArea p={15} h={300} w='100%' mt={10}>
                    <Flex gap={10} direction='column'>
                        <CreateServerTemplate icon="create-server.svg" name='Create My Own' onclick={()=>{}}/>
                        <Space h={0}></Space>
                        <Text size='10' lh={1} fw='bolder'>START FROM A TEMPLATE </Text>
                        <CreateServerTemplate icon="gaming.svg" name='Gaming' onclick={()=>{}}/>
                        <CreateServerTemplate icon="friends.svg" name='Friends' onclick={()=>{}}/>
                        <CreateServerTemplate icon="study.svg" name='Study' onclick={()=>{}}/>
                        <CreateServerTemplate icon="localcommunity.svg" name='Local Community' onclick={()=>{}}/>
                        <CreateServerTemplate icon="artists.svg" name='Artists & Creators' onclick={()=>{}}/>
                    </Flex>
                </ScrollArea>
                <Flex w='90%' gap={5} direction='column'>
                    <Text ta='center'>Have an invite already?</Text>
                    <Button>Join a Server</Button>
                </Flex>
            </Flex>
        </Modal>
    </>
}