import { Flex, Space } from "@mantine/core";
import ChatInput from "@/components/Chat/ChatInput";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatContent from "@/components/Chat/ChatContent";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params)
  return (
    <Flex pos="relative" direction="column" bg="var(--mantine-color-dark-5)" h="100%" w="100%">
      <ChatHeader />
      <ChatContent />
      <Space mih={80}></Space>
      <ChatInput />
    </Flex>
  );
}
