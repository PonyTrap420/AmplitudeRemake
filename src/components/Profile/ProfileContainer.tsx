'use client'

import { User } from "@/types/User";
import { Flex, Text, Indicator, Avatar, Space, ActionIcon, PopoverDropdown, Popover, PopoverTarget } from "@mantine/core";
import { IconMicrophoneFilled, IconHeadset, IconSettingsFilled } from "@tabler/icons-react";
import ProfilePopup from "./ProfilePopup";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { statusToColor } from "@/utils/user";

const fetchUser = async (url:string) => {
    const res = await axios.get(url);
    return res.data;
};

export default function ProfileContainer({userId}:{userId:string})
{
    const { data: user, mutate } = useSWR<User>(`/api/user?id=${userId}`, fetchUser);

    if (!user) return null;

    return <Flex style={{zIndex:11}} pos='absolute' bottom={0} align='center' bg='#181818' gap={0} p={4} w="100%">

    <Popover position='top-start' offset={{mainAxis:10, crossAxis: -25 }} >
        <PopoverTarget>
            <Flex gap={10} p={5} pr={10} className="rounded-md  hover:bg-[#69696933] hover:cursor-pointer">
                <Indicator processing={user.status=='online'} withBorder size={14} color={statusToColor(user.status)} offset={5} position='bottom-end'>
                <Avatar size={35}></Avatar>
                </Indicator>
                <Flex direction='column'>
                    <Text size='sm' h={20} fw='bold' style={{whiteSpace:'nowrap'}}>{user?.displayName?user.displayName:user?.username}</Text>
                    <Text size='xs' style={{whiteSpace:'nowrap'}}>{user?.username}</Text>
                </Flex>
            </Flex>


        </PopoverTarget>
        <PopoverDropdown className="rounded-md" bd={0}>
            {user?
            <ProfilePopup user={user} mutate={mutate}/>
            :null}
        </PopoverDropdown>
    </Popover>
    

    <Space miw={0} w="100%"/>

    <Flex gap={0} pr={7}>
        <ActionIcon size={30} variant='subtle'>
            <IconMicrophoneFilled size={20}/>
        </ActionIcon>
        <ActionIcon size={30} variant='subtle'>
            <IconHeadset size={20}/>

        </ActionIcon>
        <Link href='/settings' replace>
        <ActionIcon size={30} variant='subtle'>
            <IconSettingsFilled size={20}/>
        </ActionIcon>
        </Link>
    </Flex>
</Flex>
}