import { Flex,Text, Card, Box } from "@mantine/core";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

 return <Flex align='center' w="100%" direction='column'>
    <Card bg='#181818' maw='100%' h='80vh' w="80%" withBorder p={0}>
        <Flex h={"100%"} direction='column'>
          <Text pl={15} h={20} lh={"20px"} fw='bold' size='xs'>Amplitude</Text>
          <Box style={{flexGrow:1,overflow:'auto',scrollbarWidth:'none'}} w={"100%"}>
            {children}
          </Box>
        </Flex>
    </Card> 
 </Flex>
}
