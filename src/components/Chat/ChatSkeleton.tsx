import { Flex, Skeleton } from "@mantine/core";

export default function ChatSkeleton()
{
    return (
        <Flex p={20} w="100%" direction="column">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} w="100%" h={50} />
          ))}
        </Flex>
      );
}