import { Flex,Text, Card, ScrollArea, Divider } from "@mantine/core";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import Server from "../components/Home/Server";
import Link from "next/link";
import { getIronSession, IronSession, IronSessionData } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSession() {
  const session : IronSession<IronSessionData> = await getIronSession(cookies(), sessionOptions);

  return session;
}

export default async function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

 const session = await getSession();

 const headersList = headers();
 const header_url = headersList.get('x-url') || "";
 const url = new URL(header_url);

  if (!(url.pathname == "/login" || url.pathname == "/register") && !session.user) {
    //redirect("/login");
  }
  else if(url.pathname == "/login" && session.user)
    redirect("/home/friends");

 const servers = Array.from({ length: 23 }).map((_, index) => {
   return <Server key={index}/>
 });

 return <Flex align='center' w="100%" direction='column'>
    <Card bg='#181818' maw='100%' h='80vh' w="80%" withBorder pl={0} pr={0}>
        <Text ml={10} mt={-10} mb={5} fw='bold' size='md'>Amplitude</Text>
        <Flex h="100%">   
                <ScrollArea type='never' miw={100} maw={100} scrollbars='y'>
                    <Flex align='center' gap={10} direction='column'>
                        <div className="cursor-pointer transition-all duration-200 p-2.5 bg-[#161616] rounded-[100%] ease hover:bg-[#1a56d9] hover:rounded-[35%]">
                            <Link href="/">
                                <IconBrandDiscordFilled color="white" size={50}/>
                            </Link>
                        </div>

                        <Divider size='md' w="50%" orientation='horizontal'/>

                        {servers}
                    </Flex>
                </ScrollArea>
            {children}
        </Flex>
    </Card> 
 </Flex>
}
