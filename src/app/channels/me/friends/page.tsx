'use client'

import CreateDM from "@/components/Other/CreateDM";
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
    const [searchValue, setSearchValue] = useState<string>('');

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

    const filteredFriends = data?.filter((friend: User) => {
        // For online friends
        if (friendsType === FriendsType.ONLINE) {
            return friend.status !== "offline";
        }
        
        // For other types (with search)
        if (searchValue) {
            return (
                friend.displayName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                friend.username.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return true;
    });

    const friendsList = filteredFriends?.map((friend: User, index: number) => {
        return <Friend type={friendsType} key={index} friend={friend} />;
      });

    return <Flex direction='column' bg='#0c0c0c' h="100%" w="100%" >
    <Flex pr={0} mah={45} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
        <Flex align='center' ml={10} gap={10}>
            <IconFriends size={20}/>
            <Text size='sm' fw="bold">Friends</Text>
        </Flex>
        <Divider color="dark.3"  size={2} orientation='vertical'/>
        <Flex gap={5}>
            <Button bg={friendsType==FriendsType.ONLINE?'dark.4':''} c={'white'} variant='subtle' onClick={()=>setFriendsType(FriendsType.ONLINE)} size='xs'>Online</Button>
            <Button bg={friendsType==FriendsType.ALL?'dark.4':''} variant='subtle' onClick={()=>setFriendsType(FriendsType.ALL)} size='xs'>All</Button>
            <Button bg={friendsType==FriendsType.PENDING?'dark.4':''} variant='subtle' onClick={()=>setFriendsType(FriendsType.PENDING)} size='xs'>Pending</Button>
            <Button bg={friendsType==FriendsType.BLOCKED?'dark.4':''}variant='subtle'  onClick={()=>setFriendsType(FriendsType.BLOCKED)} size='xs'>Blocked</Button>
        </Flex>
        <Button onClick={()=>setFriendsType(FriendsType.ADD)} miw={'fit-content'} size='xs' variant='light' c='green'>Add Friend</Button>
        <Space miw={0} w="100%"/>
        <Flex pr={5} justify='end' h={"100%"} align='center' p={0}>
            <CreateDM>
                <ActionIcon h={40} w={40} variant='transparent'><IconMessagePlus size={20}/></ActionIcon>
            </CreateDM>
            <Divider mr={0} ml={0} size={2} color="dark.3" orientation='vertical'/>
            <ActionIcon h={20} w={20}  variant='transparent'><IconInbox size={20}/></ActionIcon>
            <ActionIcon h={20} w={20}  variant='transparent'><IconHelpCircleFilled size={20}/></ActionIcon>
        </Flex>
    </Flex>


    <Flex w="100%" h="100%">
        <Flex pt={20} p={30} w="100%" direction='column'>
            
            {friendsType!=FriendsType.ADD?
            <>
                <Flex justify='center'>
                    <TextInput value={searchValue} onChange={(event) => setSearchValue(event.currentTarget.value)} rightSection={<IconSearch size={20}/>} size='md' w="100%" styles={{input:{border:0,backgroundColor:'var(--mantine-color-dark-8)'}}} placeholder="Search"/>
                </Flex>
                <Text size='sm' mt={20} mb={10}>{friendsType} - {friendsList?.length}</Text>
                <ScrollArea>
                    <Flex direction='column'>
                        {friendsList}
                    </Flex>
                </ScrollArea>
            </>
        :
            <>
                <Title size='h5' c={'white'} lts={1}>ADD FRIEND</Title>
                <Text size='sm' m={10} ml={0}>You can add friends with their Amplitude username</Text>
                <Flex mt={10} justify='center'>
                    <TextInput ref={addFriendRef} error={addFriendError} classNames={{input: 'focus:!border-sky-500'}} radius={'md'} 
                    rightSection={<Button onClick={() => addFriend(addFriendRef.current?.value)} size='sm' color={'#1a56d9'} variant='filled' ml={-160}>Send Friend Request</Button>} size='md' w="100%" styles={{input:{backgroundColor:'var(--mantine-color-dark-8)',height:55}}} placeholder="You can add friends with their Amplitude username."/>
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