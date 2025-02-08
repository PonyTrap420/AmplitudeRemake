'use client'

import CreateServer from "@/components/Home/CreateServer";
import Server from "@/components/Home/Server";
import { useServers } from "@/hooks/useServers";
import { Flex, ScrollArea, Divider } from "@mantine/core";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { servers } = useServers();
  
  return (<>
    <ScrollArea type='never' miw={100} maw={100} scrollbars='y'>
        <Flex align='center' gap={10} direction='column'>
            <div className="cursor-pointer transition-all duration-200 p-2.5 bg-[#161616] rounded-[100%] ease hover:bg-[#1a56d9] hover:rounded-[35%]">
                <Link href="/">
                    <IconBrandDiscordFilled color="white" size={50}/>
                </Link>
            </div>
    
            <Divider size='md' w="50%" orientation='horizontal'/>
    
            {servers?.map((server) => (
                <Server key={server.id} server={server} />
            ))}
            <CreateServer />
        </Flex>
    </ScrollArea>
    {children}
    </>
  );
}
