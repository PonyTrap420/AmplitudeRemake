'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Flex, Text, Loader, Modal, Button, Image, Stack } from "@mantine/core";

type ServerInfo = {
    id: string;
    name: string;
    imageUrl: string | null;
};

export default function InvitePage({ params }: { params: { code: string } }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const { data } = await axios.get(`/api/invite/${params.code}`);
                if (data.serverId) {
                    const { data: serverData } = await axios.get(`/api/server/${data.serverId}`);
                    setServerInfo({
                        id: data.serverId,
                        name: serverData.name,
                        imageUrl: serverData.imageUrl
                    });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    setError(error.response?.data?.error || 'Failed to load server information');
                } else {
                    setError('Failed to load server information');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchServerInfo();
    }, [params.code]);

    const handleJoin = async () => {
        try {
            await axios.post(`/api/server/${serverInfo?.id}/invite`);
            router.push(`/channels/server/${serverInfo?.id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error || 'Failed to join server');
            } else {
                setError('Failed to join server');
            }
        }
    };

    if (loading) {
        return (
            <Flex w={"100%"} align="center" justify="center">
                <Loader size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex h="100vh" align="center" justify="center">
                <Text size="xl" c="red">{error}</Text>
            </Flex>
        );
    }

    return (
        <Modal
            opened={true}
            onClose={() => router.push('/channels/me')}
            title="Join Server"
            centered
            size="sm"
            styles={{
                inner: {
                    left: 0
                }
            }}
        >
            <Stack align="center">
                {serverInfo?.imageUrl ? (

                    <Image 
                        src={serverInfo.imageUrl} 
                        width={80} 
                        height={80} 
                        radius="100%"
                        style={{width: 80, height: 80}}
                        alt="Server icon"
                    />
                ) : (
                    <Flex 
                        w={80} 
                        h={80} 
                        bg="dark.4" 
                        align="center" 
                        justify="center"
                    >
                        <Text size="xl" fw={500}>
                            {serverInfo?.name.charAt(0).toUpperCase()}
                        </Text>
                    </Flex>
                )}
                
                <Text size="lg" fw={500}>
                    Join {serverInfo?.name}?
                </Text>

                <Button fullWidth onClick={handleJoin}>
                    Join Server
                </Button>
            </Stack>
        </Modal>
    );
} 