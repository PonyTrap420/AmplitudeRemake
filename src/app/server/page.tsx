import { Box, Flex, Overlay, Title } from "@mantine/core";
import { IconBlobFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Server(){
    return <Flex pos='relative' w="100%">
        <Overlay blur="6vw">  
            <Flex pos='relative' w="100%" h="100%" justify='center' align='center'>
                <Link href="/home">
                <Title>Server...</Title>
                </Link>
            </Flex>
        </Overlay>
        <Box pos='relative' w="100%">
            <Flex w="100%" h="100%" justify='center' align='center'>
                <IconBlobFilled color="yellow" size="20vw"/>
            </Flex>
        </Box>
    </Flex>
}