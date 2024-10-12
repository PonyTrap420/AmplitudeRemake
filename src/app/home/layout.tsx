import { Card,Text,Container, Flex, TextInput, ScrollArea, Button, Popover, PopoverTarget, Tooltip, ActionIcon, PopoverDropdown, Title, Indicator, Avatar, Space } from "@mantine/core"
import { IconFriends, IconShoppingCart, IconUserFilled, IconPlus, IconMicrophoneFilled, IconHeadset, IconSettingsFilled } from "@tabler/icons-react"
import DirectMessage from "../components/Home/DirectMessage";
import Link from "next/link";

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const dms = Array.from({ length: 23 }).map((_, index) => {
        return <DirectMessage key={index}/>
      });

    return (
        <Card w='100%' h="100%" p={0}>
            <Flex w="100%" h="100%">
                <Flex pos='relative' miw={300} maw={300} h="100%" w="20%" align='center' direction='column'>
                    <Container mih={60} style={{borderBottom:'2px solid var(--mantine-color-dark-9)'}} w="100%">
                    <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={11} placeholder="Find or start a conversation"/>
                    </Container>

                    <ScrollArea w="100%" p={10} pb={0}>
                        <Flex direction='column' gap={10} mt={10} w="95%">
                            <Link href={"/home/friends"}>
                                <Button w={"100%"} h={45} c='gray' variant='subtle' justify='start' leftSection={<IconFriends size={30}/>} >
                                    <Text size="xl">Friends</Text> 
                                </Button>
                            </Link>

                            <Link href={"/home/shop"}>
                                <Button w={"100%"} h={45} c='gray' variant='subtle' justify='start' leftSection={<IconShoppingCart size={30}/>} >
                                    <Text size="xl">Shop</Text> 
                                </Button>
                            </Link>

                            <Link href={"/home/settings"}>
                                <Button w={"100%"} h={45} c='gray' variant='subtle' justify='start' leftSection={<IconUserFilled size={30}/>} >
                                    <Text size="xl">My Profile</Text> 
                                </Button>
                            </Link>
                        </Flex>
                    
                        <Flex mt={20} p={10} justify='space-between'>
                            <Text>DIRECT MESSAGES</Text>
                            <Popover>
                                <PopoverTarget>
                                    <Tooltip label="Create DM">
                                    <ActionIcon c='gray' variant='transparent'>
                                        <IconPlus/>
                                    </ActionIcon>
                                    </Tooltip>
                                </PopoverTarget>
                                <PopoverDropdown>
                                    <Flex direction='column' w={450} h={450}>
                                        <Title size='h2' fw='600'>Select Friends</Title>
                                        <Text>You can add 9 more friends.</Text>
                                        <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={20} placeholder="Type the username of a friend"/>
                                        </Flex>
                                </PopoverDropdown>
                            </Popover>
                        </Flex>

                        <Flex direction='column' gap={5}>
                        {dms}
                        </Flex>
                    </ScrollArea>

                    <Flex style={{zIndex:201}} pos='absolute' bottom={0} align='center' bg='dark.7' gap={10} p={15} w="100%">
                        <Indicator withBorder size={14} color='red' offset={8} position='bottom-end'>
                        <Avatar size={45}></Avatar>
                        </Indicator>
                        <Flex direction='column'>
                            <Text fw='bold'>PonyTrap</Text>
                            <Text>🪐</Text>
                        </Flex>

                        <Space miw={0} w="100%"/>

                        <Flex gap={5}>
                            <ActionIcon variant='transparent'>
                                <IconMicrophoneFilled/>
                            </ActionIcon>
                            <ActionIcon variant='transparent'>
                                <IconHeadset/>
                            </ActionIcon>
                            <ActionIcon variant='transparent'>
                                <IconSettingsFilled/>
                            </ActionIcon>
                        </Flex>
                    </Flex>

                </Flex>
                {children}
            </Flex>
        </Card>
    )
  }