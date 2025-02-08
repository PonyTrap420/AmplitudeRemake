
import { Button, Flex } from "@mantine/core";
import { ReactNode } from "react";

export function ContextMenuButton({text,rightSection,color}:{text:string,rightSection:ReactNode,color?:string}){
    return <Button c={color} justify='space-between' p={10} variant='subtle' rightSection={rightSection}>{text}</Button>
}

export default function ContextMenu({children, location}:{children:ReactNode,location:{x:number, y:number}}){
    
    return (
      <Flex style={{zIndex:10}} className="rounded-md" pos='absolute' p={10} bg="dark.9" direction='column' top={location.y} left={location.x} gap={10} w={200}>
          {children}
        </Flex>
    )
}