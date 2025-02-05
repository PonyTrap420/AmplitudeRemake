import { getUser } from "@/services/userServices";
import { User } from "@/types/User";
import { Flex, Text, Indicator, Avatar, Space, ActionIcon, PopoverDropdown, Popover, PopoverTarget } from "@mantine/core";
import { IconMicrophoneFilled, IconHeadset, IconSettingsFilled } from "@tabler/icons-react";
import ProfilePopup from "./ProfilePopup";
import Link from "next/link";
import { verifySession } from "@/lib/dal";

export default async function ProfileContainer()
{
    const session = await verifySession()

    if (!session)
      return

    const user : User | null = await getUser(session.userId);

    return <Flex style={{zIndex:201}} pos='absolute' bottom={0} align='center' bg='#181818' gap={10} p={7} w="100%">

    <Popover position='top-start' offset={{mainAxis:10, crossAxis: -25 }} >
        <PopoverTarget>
            <Flex gap={10} p={5} pr={20} className="rounded-md  hover:bg-[#69696933] hover:cursor-pointer">
                <Indicator withBorder size={14} color='red' offset={8} position='bottom-end'>
                <Avatar size={45}></Avatar>
                </Indicator>
                <Flex direction='column'>
                    <Text h={20} fw='bold'>{user?.displayName?user.displayName:user?.username}</Text>
                    <Text>{user?.username}</Text>
                </Flex>
            </Flex>
        </PopoverTarget>
        <PopoverDropdown className="rounded-md" bd={0}>
            {user?
            <ProfilePopup user={user}/>
            :null}
        </PopoverDropdown>
    </Popover>
    

    <Space miw={0} w="100%"/>

    <Flex gap={2}>
        <ActionIcon size={35} variant='subtle'>
            <IconMicrophoneFilled/>
        </ActionIcon>
        <ActionIcon size={35} variant='subtle'>
            <IconHeadset/>
        </ActionIcon>
        <Link href='/settings' replace>
        <ActionIcon size={35} variant='subtle'>
            <IconSettingsFilled/>
        </ActionIcon>
        </Link>
    </Flex>
</Flex>
}