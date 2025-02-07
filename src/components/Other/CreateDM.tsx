'use client'

import { User } from "@/types/User";
import { Autocomplete, Flex, Popover, PopoverDropdown, PopoverTarget, Title, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import useSWR from "swr";

const fetchFriends = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export default function CreateDM({
    children,
  }: {
    children: React.ReactNode
  }){

    const { data } = useSWR<User[]>([`/api/friends?status=all`], ([url]) => fetchFriends(url));
    const friends = data?.map((friend)=>{
      return friend.username
    })

    const [chats, setChats] = useLocalStorage<string[]>({
      key: "chats",
      defaultValue: [],
    });    
    

    return  <Popover>
    <PopoverTarget>
        <Tooltip label="Create DM">
        {children}
        </Tooltip>
    </PopoverTarget>
    <PopoverDropdown>
        <Flex direction='column' w={250} >
            <Title size='h2' fw='600'>Select Friends</Title>
            <Autocomplete
           onOptionSubmit={(value: string) => {
            const userId = data?.find(user => user.username === value)?.id;
            if (userId && !chats.includes(userId)) {
                setChats([...chats, userId]);
            }
        }}
          
            styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={20}
            label=""
            placeholder="Type the username of a friend"
            data={friends}
            />
            </Flex>
    </PopoverDropdown>
</Popover>
}