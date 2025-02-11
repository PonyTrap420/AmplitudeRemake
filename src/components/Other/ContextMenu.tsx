import { Button, Flex } from "@mantine/core";
import { ReactNode } from "react";

export type ContextMenuButtonProps = {
    text: string;
    rightSection: ReactNode;
    color?: string;
    onClick?: () => void;
};

export function ContextMenuButton({ text, rightSection, color, onClick }: ContextMenuButtonProps) {
    return <Button size="xs" fw={500} onClick={onClick} c={color?color:'dark.1'} justify='space-between' p={5} variant='subtle' rightSection={rightSection}>{text}</Button>
}


export default function ContextMenu({
    children, 
    location,
}: {
    children: ReactNode;
    location: { x: number; y: number };
}) {
    return (
        <Flex 
            style={{zIndex:12, border: '1px solid var(--mantine-color-dark-4)'}} 
            className="rounded-md" 
            pos='absolute' 
            p={5} 
            bg="dark.6"
            direction='column' 
            top={location.y} 
            left={location.x} 
            gap={5} 
            w={170}


        >
            {children}
        </Flex>
    );
}