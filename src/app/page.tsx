import { Avatar, Badge, Card, Divider, Flex, ScrollArea, Text } from "@mantine/core";
import { IconBrandDiscordFilled, IconUser } from "@tabler/icons-react";

export default function Home() {

 const servers = Array.from({ length: 23 }).map((_, index) => {
    return <Avatar key={index} size={60} radius='xl'>
        <IconUser size={40}/>
    </Avatar>
 });

 return <Flex align='center' w="100%" direction='column'>
    <Card maw='100%' h='80vh' w="80%" withBorder pl={0} pr={0}>
        <Text ml={5} mt={-10} mb={5} fw='bold' size='md'>Amplitude</Text>
        <Flex h="100%" >         
            <ScrollArea type='never' scrollbars='y'>
                <Flex align='center' w={100} gap={10} direction='column'>
                    <Avatar color='grey' size={70}>
                        <IconBrandDiscordFilled color="white" size={50}/>
                    </Avatar>

                    <Divider size='md' w="70%" orientation='horizontal'/>

                    {servers}
                </Flex>
            </ScrollArea>
            <Card w='100%' bg='dark'>
                <Badge pos='absolute' bottom={10} right={5} variant='light' c='blue'>גיא</Badge>
            </Card>
        </Flex>
    </Card>
 </Flex>
}
