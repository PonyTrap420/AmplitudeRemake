'use client'

import { Avatar } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";

export default function Server()
{
    const {hovered, ref} = useHover();

    return <Avatar size={50} ref={ref} style={{transition:'0.2s ease-out',cursor:'pointer'}} radius={hovered?'lg':'xl'}>
        <IconUser size={30}/>
    </Avatar>
}