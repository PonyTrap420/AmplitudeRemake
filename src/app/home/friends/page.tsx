'use client'

import CreateDM from "@/components/CreateDM";
import Friend from "@/components/Home/Friend";
import { Flex,Text, Divider, Button, TextInput, ScrollArea, ActionIcon, Space, Title } from "@mantine/core";
import { IconFriends, IconHelpCircleFilled, IconInbox, IconMessagePlus, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import axios, { AxiosError } from 'axios';
import { FriendsType, User } from "@/types/User";
import useSWR, { useSWRConfig } from "swr";


const fetchFriends = async (url: string, status: string|unknown) => {
    const response = await axios.get(`${url}${status}`);
    return response.data;
  };

export default function Friends(){
    const { mutate } = useSWRConfig()

    const [friendsType, setFriendsType] = useState<FriendsType>(FriendsType.ONLINE);

    const { data } = useSWR<User[]>([`/api/friends?status=`, `${friendsType.toLowerCase()}`], ([url, status]) => fetchFriends(url, status));
    const addFriendRef = useRef<HTMLInputElement>(null);
    const [addFriendError, setAddFriendError] = useState<string | null>(null);

    const addFriend = async (username: string | undefined) => {
        if(!username)
            return
        try {
          await axios.post('/api/friends', { username });

          mutate([`/api/friends?status=`, `${friendsType.toLowerCase()}`]);
        }   catch (e: unknown) {
            if (e instanceof AxiosError && e.response && e.response.data) {
                setAddFriendError(e.response.data.error);
            } else {
                setAddFriendError('An unexpected error occurred');
            }
        }
      };

    const friendsList = data?.map((friend: User, index: number) => {
        return <Friend type={friendsType} key={index} friend={friend} />;
      });

    return <Flex direction='column' bg='#0c0c0c' h="100%" w="100%" >
    <Flex pr={0} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
        <Flex align='center' ml={10} gap={10}>
            <IconFriends size={30}/>
            <Text fz='h4' fw="bold">Friends</Text>
        </Flex>
        <Divider color="dark.3"  size={2} orientation='vertical'/>
        <Flex gap={5}>
            <Button bg={friendsType==FriendsType.ONLINE?'dark.4':''} c={'white'} variant='subtle' onClick={()=>setFriendsType(FriendsType.ONLINE)} fz='h4'>Online</Button>
            <Button bg={friendsType==FriendsType.ALL?'dark.4':''} variant='subtle' onClick={()=>setFriendsType(FriendsType.ALL)} fz='h4'>All</Button>
            <Button bg={friendsType==FriendsType.PENDING?'dark.4':''} variant='subtle' onClick={()=>setFriendsType(FriendsType.PENDING)} fz='h4'>Pending</Button>
            <Button bg={friendsType==FriendsType.BLOCKED?'dark.4':''}variant='subtle'  onClick={()=>setFriendsType(FriendsType.BLOCKED)} fz='h4'>Blocked</Button>
        </Flex>
        <Button onClick={()=>setFriendsType(FriendsType.ADD)} miw={'fit-content'} fz='h4' variant='light' c='green'>Add Friend</Button>
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
        <Flex pt={20} p={30} w="100%" direction='column'>
            
            {friendsType!=FriendsType.ADD?
            <>
                <Flex justify='center'>
                    <TextInput rightSection={<IconSearch/>} size='lg' w="100%" styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search"/>
                </Flex>
                <Text mt={20} mb={10}>{friendsType} - 37</Text>
                <ScrollArea>
                    <Flex direction='column'>
                        {friendsList}
                    </Flex>
                </ScrollArea>
            </>
        :
            <>
                <Title size='h4' c={'white'} lts={1}>ADD FRIEND</Title>
                <Text m={10} ml={0}>You can add friends with their Amplitude username</Text>
                <Flex mt={10} justify='center'>
                    <TextInput ref={addFriendRef} error={addFriendError} classNames={{input: 'focus:!border-sky-500'}} radius={'md'} 
                    rightSection={<Button onClick={() => addFriend(addFriendRef.current?.value)} color={'#1a56d9'} variant='filled' ml={-140}>Send Friend Request</Button>} size='lg' w="100%" styles={{input:{backgroundColor:'var(--mantine-color-dark-8)',height:60}}} placeholder="You can add friends with their Amplitude username."/>
                </Flex>
                <Divider mt={30} size={3} w='100%' orientation='horizontal'></Divider>
            </>
            }
            
        </Flex>
        <Divider size={3} orientation='vertical'/>
        <Flex w={600}>

        </Flex>
    </Flex>
</Flex>
}