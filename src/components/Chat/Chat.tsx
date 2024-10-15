import { Message } from "@/types/Message";
import MessageBlock from "@/components/Chat/MessageBlock";
import { Flex, ScrollArea, Text } from "@mantine/core";

export default async function Chat() {
  await new Promise(resolve => setTimeout(resolve, 300));
  const data = await import("@/.mock/messages.json");
  const messages: Message[] = data.default as unknown as Message[];
  const reversedMessages = [...messages].reverse();
  let firstChecker = '';

  return (
    <ScrollArea >
     <Flex p={20} w="100%" direction='column'>

      {reversedMessages.length > 0
        ? reversedMessages.map(function (message: Message, index: number){
          const isFirst = message.author.id!=firstChecker;
          if(isFirst)
            firstChecker=message.author.id

          return <MessageBlock isFirst={isFirst} key={index} message={message} />
      })
        : 
        <Text>No Messages</Text>
        }
        
      </Flex>
    </ScrollArea>
  );
}
