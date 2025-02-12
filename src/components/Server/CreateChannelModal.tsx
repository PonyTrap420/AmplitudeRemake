'use client'

import { Modal, Stack, TextInput, Button, SegmentedControl, Checkbox, Text, Flex } from "@mantine/core";
import { IconHash, IconVolume } from "@tabler/icons-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";

type CreateChannelModalProps = {
    opened: boolean;
    onClose: () => void;
    serverId: string;
    categoryId: string | null;
    onChannelCreated: () => Promise<void>;
}

type ChannelType = 'text' | 'voice';

export default function CreateChannelModal({ opened, onClose, serverId, categoryId, onChannelCreated }: CreateChannelModalProps) {
    const [channelName, setChannelName] = useState('');
    const [channelType, setChannelType] = useState<ChannelType>('text');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreateChannel = async () => {
        try {
            await axios.post(`/api/server/${serverId}/channels`, {
                name: channelName.toLowerCase().replace(/\s+/g, '-'),
                type: channelType,
                isPrivate,
                categoryId
            });
            await onChannelCreated();
            handleClose();
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Failed to create channel:', error.response?.data?.error);
            }
        }
    };

    const handleClose = () => {
        setChannelName('');
        setChannelType('text');
        setIsPrivate(false);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Create Channel"
            centered
            styles={{
                inner: { left: 0 }
            }}
        >
            <Stack>
                <SegmentedControl
                    fullWidth
                    value={channelType}
                    onChange={(value) => setChannelType(value as ChannelType)}
                    data={[
                        {
                            label: (
                                <Flex align="center" gap={8}>
                                    <IconHash size={16} />
                                    <Text size="sm">Text</Text>
                                </Flex>
                            ),
                            value: 'text'
                        },
                        {
                            label: (
                                <Flex align="center" gap={8}>
                                    <IconVolume size={16} />
                                    <Text size="sm">Voice</Text>
                                </Flex>
                            ),
                            value: 'voice'
                        }
                    ]}
                />

                <TextInput
                    label="CHANNEL NAME"
                    placeholder={channelType === 'text' ? 'new-text-channel' : 'new-voice-channel'}
                    value={channelName}
                    onChange={(e) => setChannelName(e.currentTarget.value)}
                    leftSection={channelType === 'text' ? <IconHash size={16} /> : <IconVolume size={16} />}
                    required
                />

                <Checkbox
                    label="Private Channel"
                    description="Only selected members can view this channel"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />

                <Button 
                    onClick={handleCreateChannel}
                    disabled={!channelName.trim()}
                    fullWidth
                >
                    Create Channel
                </Button>
            </Stack>
        </Modal>
    );
} 