import { ActionIcon, Avatar, Button, Card, Container, Divider, Flex, Popover, PopoverDropdown, PopoverTarget, ScrollArea, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { IconBrandDiscordFilled, IconFriends, IconPlus, IconSearch, IconShoppingCart, IconUserFilled } from "@tabler/icons-react";
import Friend from "./components/Home/Friend";
import Server from "./components/Home/Server";
import DirectMessage from "./components/Home/DirectMessage";

export default function Home() {

 const servers = Array.from({ length: 23 }).map((_, index) => {
   return <Server key={index}/>
 });

 const dms = Array.from({ length: 23 }).map((_, index) => {
   return <DirectMessage key={index}/>
 });

 const friends = Array.from({ length: 37 }).map((_, index) => {
    return <>
        <Friend key={index}/>
    </>
   
 });

 return <Flex align='center' w="100%" direction='column'>
    <Card bg='var(--mantine-color-dark-8)' maw='100%' h='80vh' w="80%" withBorder pl={0} pr={0}>
        <Text ml={10} mt={-10} mb={5} fw='bold' size='md'>Amplitude</Text>
        <Flex h="100%">         
            <ScrollArea type='never' scrollbars='y'>
                <Flex align='center' w={100} gap={10} direction='column'>
                    <Avatar color='grey' size={70}>
                        <IconBrandDiscordFilled color="white" size={50}/>
                    </Avatar>

                    <Divider size='md' w="70%" orientation='horizontal'/>

                    {servers}
                </Flex>
            </ScrollArea>
            <Card w='100%' h="100%" p={0}>
                <Flex w="100%" h="100%">
                    <Flex miw={300} maw={300} h="100%" w="20%" align='center' direction='column'>
                        <Container mih={60} style={{borderBottom:'2px solid var(--mantine-color-dark-9)'}} w="100%">
                        <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={11} placeholder="Find or start a conversation"/>
                        </Container>
                        <ScrollArea w="100%" p={10}>
                        <Flex direction='column' gap={10} mt={10} w="95%">
                            <Button h={45} c='gray' variant='subtle' justify='start' leftSection={<IconFriends size={30}/>} >
                                <Text size="xl">Friends</Text> 
                            </Button>
                            <Button h={45} c='gray' variant='subtle' justify='start' leftSection={<IconShoppingCart size={30}/>} >
                                <Text size="xl">My Profile</Text> 
                            </Button>
                            <Button h={45} c='gray' variant='subtle' justify='start' leftSection={<IconUserFilled size={30}/>} >
                                <Text size="xl">Shop</Text> 
                            </Button>
                        </Flex>
                        
                        <Flex mt={20} p={10} justify='space-between'>
                            <Text>DIRECT MESSAGES</Text>
                            <Popover>
                                <PopoverTarget>
                                    <Tooltip label="Create DM">
                                    <ActionIcon c='gray' variant='transparent'>
                                        <IconPlus/>
                                    </ActionIcon>
                                    </Tooltip>
                                </PopoverTarget>
                                <PopoverDropdown>
                                    <Flex direction='column' w={450} h={450}>
                                        <Title size='h2' fw='600'>Select Friends</Title>
                                        <Text>You can add 9 more friends.</Text>
                                        <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={20} placeholder="Type the username of a friend"/>
                                        </Flex>
                                </PopoverDropdown>
                            </Popover>
                            
                        </Flex>

                        <Flex direction='column' gap={10}>
                        {dms}
                        </Flex>

                        </ScrollArea>

                    </Flex>
                    <Flex direction='column' bg='var(--mantine-color-dark-5)' h="100%" w="100%" >
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
                                <Flex gap={10} direction='column'>
                                    {friends}
                                </Flex>
                                </ScrollArea>
                            </Flex>
                            <Divider size={3} orientation='vertical'/>
                            <Flex w={600}>

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    </Card>
 </Flex>
}
