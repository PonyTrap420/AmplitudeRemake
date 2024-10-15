'use client'

import { Message } from "@/types/Message";
import MessageBlock from "@/components/Chat/MessageBlock";
import { Divider, Flex, ScrollArea, Text } from "@mantine/core";
import ContextMenu, { ContextMenuButton } from "../ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";
import { IconCopy, IconCornerUpLeft, IconCornerUpRight, IconPencil, IconPinFilled } from "@tabler/icons-react";

export default function Chat({messages}:{messages:Message[]}) {
  let firstChecker = '';
  const { clicked, setClicked, location, setLocation } = useContextMenu();

  function ContextClicked(e: React.MouseEvent)
  {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleFactor = window.devicePixelRatio || 1;

    console.log(rect);
    console.log(e);
    setClicked(true);
    setLocation({
      x: e.clientX-rect.left,
      y: e.pageY - (170*(1/scaleFactor)),
    });
  }

  return (<>
    <ScrollArea>
     <Flex p={20} w="100%" direction='column'>

      {messages.length > 0
        ? messages.map(function (message: Message, index: number){
          const isFirst = message.author.id!=firstChecker;
          if(isFirst)
            firstChecker=message.author.id

          return <MessageBlock onContextMenu={ContextClicked} isFirst={isFirst} key={index} message={message} />
      })
        : 
        <Text>No Messages</Text>
        }
        
      </Flex>
    </ScrollArea>
    {clicked?
    <ContextMenu location={location}>
      <ContextMenuButton text="Edit Message" rightSection={<IconPencil/>}/>
      <ContextMenuButton text="Reply" rightSection={<IconCornerUpLeft/>}/>
      <ContextMenuButton text="Forward" rightSection={<IconCornerUpRight/>}/>
      <Divider orientation='horizontal'/>
      <ContextMenuButton text="Copy Text" rightSection={<IconCopy/>}/>
      <ContextMenuButton text="Pin Message" rightSection={<IconPinFilled/>}/>
      <Divider orientation='horizontal'/>
      <ContextMenuButton color={'red'} text="Delete Message" rightSection={<IconPinFilled/>}/>

    </ContextMenu>:null
    }
  </>
  );
}
