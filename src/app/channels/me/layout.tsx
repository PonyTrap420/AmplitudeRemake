import { Card,Text,Container, Flex, TextInput, ScrollArea, Button, ActionIcon } from "@mantine/core"
import { IconFriends, IconShoppingCart, IconPlus} from "@tabler/icons-react"
import DirectMessage from "@/components/Home/DirectMessage";
import Link from "next/link";
import CreateDM from "@/components/Other/CreateDM";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import { verifySession } from "@/lib/dal";

export default async function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session = await verifySession()

    if (!session)
      return
    
    const dms = Array.from({ length: 23 }).map((_, index) => {
        return <DirectMessage key={index}/>
      });

    return (
        <Card bg='dark.8' w='100%' h="100%" p={0}>
            <Flex  w="100%" h="100%">
                <Flex pos='relative' miw={300} maw={300} h="100%" w="20%" align='center' direction='column'>
                    <Container mih={60} style={{borderBottom:'2px solid var(--mantine-color-dark-7)'}} w="100%">
                    <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-9)', border:0}}} mt={11} placeholder="Find or start a conversation"/>
                    </Container>

                    <ScrollArea w="100%" p={10} pb={0}>
                        <Flex direction='column' gap={10} mt={10} w="95%">
                            <Link href={"/channels/me/friends"}>
                                <Button w={"100%"} h={45} c='gray' variant='subtle' justify='start' leftSection={<IconFriends size={30}/>} >
                                    <Text size="xl">Friends</Text> 
                                </Button>
                            </Link>

                            <Link href={"/channels/me/shop"}>
                                <Button w={"100%"} h={45} c='gray' variant='subtle' justify='start' leftSection={<IconShoppingCart size={30}/>} >
                                    <Text size="xl">Shop</Text> 
                                </Button>
                            </Link>

                        </Flex>
                    
                        <Flex mt={20} p={10} justify='space-between'>
                            <Text>DIRECT MESSAGES</Text>
                            <CreateDM>
                                <ActionIcon c='gray' variant='transparent'>
                                    <IconPlus/>
                                </ActionIcon>
                            </CreateDM>
                        </Flex>

                        <Flex direction='column' gap={5}>
                        {dms}
                        </Flex>
                    </ScrollArea>

                  <ProfileContainer userId={session.userId}/>

                </Flex>
                {children}
            </Flex>
        </Card>
    )
  }