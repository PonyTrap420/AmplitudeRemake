'use client'

import { FriendsType, User } from "@/types/User";
import { ActionIcon,Text, Avatar, Flex, Indicator, Space, Tooltip, Menu } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconMessage, IconDotsVertical, IconX, IconCheck, IconFriendsOff } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useSWRConfig } from "swr";

export default function Friend({friend, type} : {friend:User, type: FriendsType})
{
    const { mutate } = useSWRConfig()

    const {hovered, ref} = useHover();

    const handleAction = async (newStatus: string) => {
        try {
            await axios.patch(`/api/friends`, {
                userId: friend.id,
                action: newStatus,
            });
            mutate([`/api/friends?status=`, `${type.toLowerCase()}`]);
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    let status : string | undefined;
    switch(type){
        case FriendsType.PENDING:
            status = friend.isSender?"Incoming":"Outgoing" + " Friend Request";
        break;
        case FriendsType.BLOCKED:
            status = "Blocked";
        break;
        default:
            status = friend.status?.toString();
        break;
    }

    return <>
    <Flex style={{borderBottom:'2px solid #474747', cursor:'pointer'}} ref={ref} p={10} gap={15} bg={hovered?'dark.4':''}>
        <Indicator processing withBorder size={14} color='green' offset={8} position='bottom-end'>
        <Avatar size={45}></Avatar>
        </Indicator>
        <Flex direction='column'>
            <Text>{friend.displayName}</Text>
            <Text style={{whiteSpace:'nowrap'}}>{status}</Text>
        </Flex>
        <Space miw={0} w="100%"/>
        <Flex mr={20} gap={10}>
            {(type === FriendsType.ONLINE || type === FriendsType.ALL) ?<>
                <Link href={`/channels/me/chat/`+friend.id}>
                <Tooltip label="Message">
                        <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconMessage/></ActionIcon>
                </Tooltip>
                </Link>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Tooltip label="More">
                        <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconDotsVertical/></ActionIcon>
                        </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown bg="dark.9">
                        <Menu.Item>
                        Start Call
                        </Menu.Item>
                        <Menu.Item c='red'onClick={() => handleAction('delete')}>
                        Remove Friend
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </>:<>
            {type == FriendsType.BLOCKED?
                <Tooltip label="Unblock">
                    <ActionIcon bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconFriendsOff/></ActionIcon>
                </Tooltip>
                : <>
                {friend.isSender?<><Tooltip label="Accept">
                    <ActionIcon onClick={() => handleAction('accept')} c={'green'} bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconCheck/></ActionIcon>
                </Tooltip>
                <Tooltip label="Reject">
                    <ActionIcon onClick={() => handleAction('reject')} c={'red'} bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconX/></ActionIcon>
                </Tooltip></>:
                <Tooltip label="Cancel">
                    <ActionIcon onClick={() => handleAction('cancel')} c={'red'} bg={hovered?'dark.6':''} variant='light' radius='xl' size={45}><IconX/></ActionIcon>
                </Tooltip>
                }
                </>}
            </>
            }
        </Flex>
    </Flex>
    </>
}