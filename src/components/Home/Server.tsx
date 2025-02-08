'use client'

import { Avatar } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { Server as ServerType } from '@/hooks/useServers';
import { useRouter } from "next/navigation";

type ServerProps = {
    server: ServerType;
};

export default function Server({ server }: ServerProps) {
    const { hovered, ref } = useHover();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/channels/server/${server.id}`);
    };

    return (
        <Avatar 
            size={60} 
            ref={ref} 
            style={{transition:'0.2s ease-out',cursor:'pointer'}} 
            radius={hovered ? 'lg' : 'xl'}
            title={server.name}
            onClick={handleClick}
        >
            <IconUser size={40}/>
        </Avatar>
    );
}