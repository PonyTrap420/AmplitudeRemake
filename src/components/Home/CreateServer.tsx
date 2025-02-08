'use client'

import { useState } from 'react';
import { ActionIcon, Button, Flex, Modal, ScrollArea, Space, Text, TextInput, Title, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconPlus, IconX, IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";

function CreateServerTemplate({name, icon, onclick}: {name: string, icon: string, onclick: () => void}) {
    return (
        <Flex 
            onClick={onclick} 
            className="bg-none hover:bg-[#2a2a2a]" 
            p={10} 
            bd={'1px solid #3d3d3d'} 
            style={{borderRadius: 5, cursor: 'pointer'}} 
            align='center' 
            justify='space-between'
        >
            <Flex align='center' gap={5}> 
                <Image src={`/svg/${icon}`} width={40} height={40} alt="create-server-own" />
                <Text fw='bolder' size="sm">{name}</Text>
            </Flex>
            <ActionIcon bg='none' c={'#3d3d3d'} opacity={0.7}>
                <IconArrowRight />
            </ActionIcon>
        </Flex>
    );
}

enum CreateServerState{
    HOME,
    CREATE,
    JOIN
}

export default function CreateServer() {
    const [opened, { open, close }] = useDisclosure(false);
    const [createServerState, setCreateServerState] = useState<CreateServerState>(CreateServerState.HOME);
    const [serverName, setServerName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const handleTemplateClick = (template: string) => {
        setSelectedTemplate(template);
        setCreateServerState(CreateServerState.CREATE);
    };

    const handleBack = () => {
        setCreateServerState(CreateServerState.HOME);
        setServerName('');
    };

    const handleCreateServer = () => {
        console.log('Creating server:', { name: serverName, template: selectedTemplate });
        close();
        setCreateServerState(CreateServerState.HOME);
        setServerName('');
    };

    const handleClose = () => {
        close();
        setTimeout(() => {
            setServerName('');
        }, 200);
    };

    return (
        <>
            <div className="cursor-pointer transition-all duration-200 p-2.5 bg-[#353636] rounded-[100%] ease hover:bg-[#1a56d9] hover:rounded-[35%]">
                <IconPlus onClick={open} color="white" size={40} />
            </div>

            <Modal 
                centered 
                size="md"
                styles={{
                    inner: { left: 0 },
                    content: { 
                        overflow: 'hidden',
                        padding: '24px',
                        minHeight: '300px',
                    },
                    header: {
                        margin: 0,
                        padding: 0
                    },
                    body: {
                        margin: 0,
                        padding: 0,
                        height: '100%'
                    }
                }}
                opened={opened} 
                onClose={handleClose} 
                withCloseButton={false}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <div style={{ position: 'relative', height: '100%', transition: 'height 200ms ease' }}>
                    <Transition
                        mounted={createServerState == CreateServerState.HOME}
                        transition="slide-right"
                        duration={200}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={{ ...styles, height: '100%', paddingTop: '20px' }}>
                                <ActionIcon 
                                    size='sm' 
                                    onClick={handleClose} 
                                    opacity={0.7} 
                                    bg='none' 
                                    style={{ 
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        zIndex: 10 
                                    }}
                                >
                                    <IconX />
                                </ActionIcon>
                                <Flex gap={10} direction='column' align='center' h="100%">
                                    <Title size='lg'>Create Your Server</Title>
                                    <Text size='sm' opacity={0.7} ta='center'>
                                        Your server is where you and your friends hang out.
                                        Make yours and start talking.
                                    </Text>
                                    <ScrollArea h={300} w='100%' type="hover" offsetScrollbars>
                                        <Flex gap={10} direction='column' p={15}>
                                            <CreateServerTemplate 
                                                icon="create-server.svg" 
                                                name='Create My Own' 
                                                onclick={() => handleTemplateClick('custom')}
                                            />
                                            <Space h={0} />
                                            <Text size='10' lh={1} fw='bolder'>START FROM A TEMPLATE</Text>
                                            <CreateServerTemplate 
                                                icon="gaming.svg" 
                                                name='Gaming' 
                                                onclick={() => handleTemplateClick('gaming')}
                                            />
                                            <CreateServerTemplate 
                                                icon="friends.svg" 
                                                name='Friends' 
                                                onclick={() => handleTemplateClick('friends')}
                                            />
                                            <CreateServerTemplate 
                                                icon="study.svg" 
                                                name='Study' 
                                                onclick={() => handleTemplateClick('study')}
                                            />
                                            <CreateServerTemplate 
                                                icon="localcommunity.svg" 
                                                name='Local Community' 
                                                onclick={() => handleTemplateClick('community')}
                                            />
                                            <CreateServerTemplate 
                                                icon="artists.svg" 
                                                name='Artists & Creators' 
                                                onclick={() => handleTemplateClick('artists')}
                                            />
                                        </Flex>
                                    </ScrollArea>
                                    <Flex w='90%' gap={5} direction='column' mt="auto" pb={10}>
                                        <Text ta='center'>Have an invite already?</Text>
                                        <Button onClick={()=>{setCreateServerState(CreateServerState.JOIN)}}>Join a Server</Button>
                                    </Flex> 
                                </Flex>
                            </div>
                        )}
                    </Transition>

                    <Transition
                        mounted={createServerState == CreateServerState.CREATE}
                        transition="slide-left"
                        duration={200}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={{ ...styles, position: 'absolute', top: 0, left: 0, right: 0, paddingTop: '20px' }}>
                                <ActionIcon 
                                    size='sm' 
                                    onClick={handleBack} 
                                    opacity={0.7} 
                                    bg='none' 
                                    style={{ 
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        zIndex: 10 
                                    }}
                                >
                                    <IconArrowLeft />
                                </ActionIcon>
                                <Flex gap={10} direction='column' align='center'>
                                    <Title size='lg'>Customize Your Server</Title>
                                    <Text size='sm' opacity={0.7} ta='center'>
                                        Give your server a personality with a name and an icon.
                                        You can always change it later.
                                    </Text>
                                    <Flex w='90%' gap={20} direction='column' mt={20} mb={20}>
                                        <TextInput
                                            label="SERVER NAME"
                                            placeholder="Enter server name"
                                            value={serverName}
                                            onChange={(e) => setServerName(e.target.value)}
                                            required
                                        />
                                        <Button 
                                            onClick={handleCreateServer}
                                            disabled={!serverName.trim()}
                                        >
                                            Create Server
                                        </Button>
                                    </Flex>
                                </Flex>
                            </div>
                        )}
                    </Transition>

                    <Transition
                        mounted={createServerState == CreateServerState.JOIN}
                        transition="slide-left"
                        duration={200}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={{ ...styles, position: 'absolute', top: 0, left: 0, right: 0, paddingTop: '20px' }}>
                                <ActionIcon 
                                    size='sm' 
                                    onClick={handleBack} 
                                    opacity={0.7} 
                                    bg='none' 
                                    style={{ 
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        zIndex: 10 
                                    }}
                                >
                                    <IconArrowLeft />
                                </ActionIcon>
                                <Flex gap={10} direction='column' align='center'>
                                    <Title size='lg'>Join a Server</Title>
                                    <Text size='sm' opacity={0.7} ta='center'>
                                       Enter an invite below to join an existing server
                                    </Text>
                                    <Flex w='90%' gap={20} direction='column' mt={20} mb={20}>
                                        <TextInput
                                            label="INVITE LINK"
                                            placeholder="https://amplitude.com/hTKzmak"
                                            value={serverName}
                                            onChange={(e) => setServerName(e.target.value)}
                                            required
                                        />
                                        <Button 
                                            onClick={handleCreateServer}
                                            disabled={!serverName.trim()}
                                        >
                                            Join Server
                                        </Button>
                                    </Flex>
                                </Flex>
                            </div>
                        )}
                    </Transition>
                </div>
            </Modal>
        </>
    );
}