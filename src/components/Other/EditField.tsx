'use client'

import { ActionIcon, Flex, Stack, Text } from "@mantine/core";
import { IconEye, IconEyeOff, IconPencil } from "@tabler/icons-react";
import { useState } from "react";

const EditField = ({ 
    label, 
    value, 
    hideReveal = true 
}: { 
    label: string, 
    value: string,
    hideReveal?: boolean 
}) => {
    const [revealed, setRevealed] = useState(false);

    const maskValue = (text: string) => {
        if (!text || text === 'Not set') return text;
        if (label.toLowerCase() === 'email') {
            const [localPart, domain] = text.split('@');
            if (!domain) return text;
            return revealed ? text : '*'.repeat(localPart.length) + '@' + domain;
        }
        return revealed ? text : '*'.repeat(text.length);
    };

    return (
        <Flex justify="space-between" align="center" w="100%">
            <Stack gap={4}>
                <Text size="xs" c="dimmed" fw={700}>{label}</Text>
                <Flex align="center" gap={5}>
                    <Text size="sm">{hideReveal ? value : maskValue(value)}</Text>
                    {!hideReveal && value !== 'Not set' && (
                        <ActionIcon 
                            variant="subtle" 
                            color="gray"
                            onClick={() => setRevealed(!revealed)}
                        >
                            {revealed ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                        </ActionIcon>
                    )}
                </Flex>
            </Stack>
            <ActionIcon variant="subtle" color="gray">
                <IconPencil size={16} />
            </ActionIcon>
        </Flex>
    );
};

export default EditField;
