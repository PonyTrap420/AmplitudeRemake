import { Flex, ScrollArea, Skeleton } from "@mantine/core";

export default function ChatSkeleton()
{
    return (<ScrollArea>

          {Array.from({ length: 10 }).map((_, index) => (     
            <Flex key={index} align='center' ml={10} mt={20} p={10} gap={15}>
              <Skeleton w={50} height={50} circle />
              <Flex w={"90%"} gap={10} direction='column'>
                  <Skeleton h={10} w={50} />
                  <Skeleton h={15} w={index%2==0?200:100} />
                </Flex>
            </Flex>
          ))}
          </ScrollArea>
      );
}