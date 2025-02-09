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
            size={50} 
            ref={ref} 
            style={{
                transition:'0.2s ease-out',
                cursor:'pointer',
                backgroundSize: 'cover'
            }} 
            radius={hovered ? 'lg' : 'xl'}
            title={server.name}
            onClick={handleClick}
            src={server.imageUrl}
        >
            {!server.imageUrl && <IconUser size={30}/>}
        </Avatar>
    );
}