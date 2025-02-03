import { Flex,Text, Card, Box } from "@mantine/core";
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
    redirect("/channels/me/friends");

 return <Flex align='center' w="100%" direction='column'>
    <Card bg='#181818' maw='100%' h='80vh' w="80%" withBorder p={0}>
        <Flex h={"100%"} direction='column'>
          <Text pl={15} h={20} lh={"20px"} fw='bold' size='xs'>Amplitude</Text>
          <Box style={{flexGrow:1,overflow:'auto',scrollbarWidth:'none'}} w={"100%"}>
            {children}
          </Box>
        </Flex>
    </Card> 
 </Flex>
}
