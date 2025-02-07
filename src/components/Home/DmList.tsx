'use client'

import { Flex } from "@mantine/core";
import DirectMessage from "./DirectMessage";
import { useLocalStorage } from "@mantine/hooks";
import useSWR from "swr";
import { User } from "@/types/User";
import { useMemo } from "react";

export default function DmList() {
    const { data } = useSWR<User[]>([`/api/friends?status=all`]);
    
    const [chats] = useLocalStorage<string[]>({
        key: "chats",
        defaultValue: [],
    });

    const userMap = useMemo(() => {
        return new Map(data?.map(user => [user.id, user]) ?? []);
    }, [data]);

    const dms = useMemo(() => 
        chats.map(userId => (
            <DirectMessage key={userId} user={userMap.get(userId)} />
        ))
    , [chats, userMap]);

    return <Flex direction="column" gap={5}>{dms}</Flex>;
}
