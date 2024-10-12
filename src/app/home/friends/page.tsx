import Friend from "@/app/components/Home/Friend";
import { Flex,Text, Divider, Button, TextInput, ScrollArea } from "@mantine/core";
import { IconFriends, IconSearch } from "@tabler/icons-react";

export default function Friends(){
    const friends = Array.from({ length: 37 }).map((_, index) => {
        return <Friend key={index}/>
     });

    return <Flex direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
    <Flex mih={60} style={{borderBottom:'2px solid var(--mantine-color-dark-9)'}} gap={20} p={10} w="100%" align='center' justify='start'>
        <Flex align='center' gap={10}>
            <IconFriends size={40}/>
            <Text fz='h3' fw="bold">Friends</Text>
        </Flex>
        <Divider size={2} orientation='vertical'/>
        <Flex>
            <Button fz='h3'>Online</Button>
            <Button fz='h3'>All</Button>
            <Button fz='h3'>Pending</Button>
            <Button fz='h3'>Blocked</Button>
        </Flex>
            <Button fz='h3' variant='light' c='green'>Add Friend</Button>
    </Flex>
    <Flex w="100%" h="100%">
        <Flex p={20} w="100%" direction='column'>
            <Flex justify='center'>
                <TextInput rightSection={<IconSearch/>} size='lg' w="100%" styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search"/>
            </Flex>
            <Text mt={20} mb={10}>Online - 37</Text>
            <ScrollArea>
            <Flex direction='column'>
                {friends}
            </Flex>
            </ScrollArea>
        </Flex>
        <Divider size={3} orientation='vertical'/>
        <Flex w={600}>

        </Flex>
    </Flex>
</Flex>
}