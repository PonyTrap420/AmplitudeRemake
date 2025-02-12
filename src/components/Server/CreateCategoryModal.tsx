'use client'

import { Modal, Stack, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import axios, { AxiosError } from "axios";

type CreateCategoryModalProps = {
    opened: boolean;
    onClose: () => void;
    serverId: string;
    onCategoryCreated: () => Promise<void>;
}

export default function CreateCategoryModal({ opened, onClose, serverId, onCategoryCreated }: CreateCategoryModalProps) {
    const [categoryName, setCategoryName] = useState('');

    const handleCreateCategory = async () => {
        try {
            await axios.post(`/api/server/${serverId}/categories`, {
                name: categoryName.toUpperCase()
            });
            await onCategoryCreated();
            handleClose();
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Failed to create category:', error.response?.data?.error);
            }
        }
    };

    const handleClose = () => {
        setCategoryName('');
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Create Category"
            centered
            styles={{
                inner: { left: 0 }
            }}
        >
            <Stack>
                <TextInput
                    label="CATEGORY NAME"
                    placeholder="new-category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.currentTarget.value)}
                    required
                />

                <Button 
                    onClick={handleCreateCategory}
                    disabled={!categoryName.trim()}
                    fullWidth
                >
                    Create Category
                </Button>
            </Stack>
        </Modal>
    );
} 