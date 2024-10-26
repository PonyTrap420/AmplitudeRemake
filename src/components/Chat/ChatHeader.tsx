import { Flex,Text, Indicator, Avatar, Space, ActionIcon, TextInput } from "@mantine/core";
import { IconPhoneCall, IconCameraFilled, IconPinnedFilled, IconUsersPlus, IconSearch, IconInbox, IconHelpCircleFilled } from "@tabler/icons-react";
import CreateDM from "../Other/CreateDM";
import { getUser } from "@/services/userServices";
import { User } from "@/types/User";

export default async function ChatHeader({id}:{id:string})
{
    const user : User | null = await getUser(id);

    return <Flex pr={10} mih={60} mah={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} gap={20} p={10} w="100%" align='center' justify='start'>
    <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
    <Avatar size={30}></Avatar>
    </Indicator>
    <Text size='xl'>{user?.displayName}</Text>
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
}