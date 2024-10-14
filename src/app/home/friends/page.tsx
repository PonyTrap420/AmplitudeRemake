import CreateDM from "@/components/CreateDM";
import Friend from "@/components/Home/Friend";
import { Flex,Text, Divider, Button, TextInput, ScrollArea, ActionIcon, Space } from "@mantine/core";
import { IconFriends, IconHelpCircleFilled, IconInbox, IconMessagePlus, IconSearch } from "@tabler/icons-react";

export default function Friends(){
    const friends = Array.from({ length: 37 }).map((_, index) => {
        return <Friend key={index}/>
     });

    return <Flex direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
    <Flex pr={0} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
        <Flex align='center' ml={10} gap={10}>
            <IconFriends size={30}/>
            <Text fz='h4' fw="bold">Friends</Text>
        </Flex>
        <Divider color="dark.3"  size={2} orientation='vertical'/>
        <Flex>
            <Button fz='h4'>Online</Button>
            <Button fz='h4'>All</Button>
            <Button fz='h4'>Pending</Button>
            <Button fz='h4'>Blocked</Button>
        </Flex>
        <Button miw={'fit-content'} fz='h4' variant='light' c='green'>Add Friend</Button>
        <Space miw={0} w="100%"/>
        <Flex pr={0} justify='center' h={"100%"} align='center' p={10}>
            <CreateDM>
                <ActionIcon h={50} w={50} variant='transparent'><IconMessagePlus size={30}/></ActionIcon>
            </CreateDM>
            <Divider mr={5} ml={5} size={2} color="dark.3" orientation='vertical'/>
            <ActionIcon h={50} w={50}  variant='transparent'><IconInbox size={30}/></ActionIcon>
            <ActionIcon h={50} w={50}  variant='transparent'><IconHelpCircleFilled size={30}/></ActionIcon>
        </Flex>
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