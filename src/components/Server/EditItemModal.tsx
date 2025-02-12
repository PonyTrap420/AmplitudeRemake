'use client'

import { Button, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";

interface EditItemModalProps {
    opened: boolean;
    onClose: () => void;
    serverId: string;
    itemId: string;
    initialName: string;
    type: 'channel' | 'category';
}

export default function EditItemModal({
    opened,
    onClose,
    serverId,
    itemId,
    initialName,
    type
}: EditItemModalProps) {
    const [name, setName] = useState(initialName);
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWRConfig();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (type === 'channel') {
                await axios.patch(`/api/server/${serverId}/channels`, {
                    channelId: itemId,
                    name
                });
            } else {
                await axios.patch(`/api/server/${serverId}/categories`, {
                    categoryId: itemId,
                    name
                });
            }
            await mutate(`/api/server/${serverId}`);
            setName('')
            onClose();
        } catch (error) {
            console.error(`Failed to update ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            centered
            styles={{inner:{left:0}}}
            opened={opened} 
            onClose={onClose} 
            title={`Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`} 
            size="sm"
        >
            <TextInput
                label={`${type.toUpperCase()} NAME`}
                placeholder={type === 'channel' ? 'new-channel' : 'New Category'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb={20}
            />
            <Button 
                fullWidth 
                onClick={handleSubmit}
                loading={loading}
            >
                Save Changes
            </Button>
        </Modal>
    );
}