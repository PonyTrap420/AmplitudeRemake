import NavButton from "@/components/Other/NavButton";
import { Flex, TextInput, Text, ActionIcon } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (<Flex pos='relative' w="100%" h={"100%"}>
        <Link href='/channels/me'>
            <ActionIcon variant='subtle' pos='absolute' top={20} right={20}><IconX/></ActionIcon>
        </Link>
        <Flex gap={5} direction='column' align='end' pr={30} w={"30%"} pt={45} bg={'dark.9'}>
             <TextInput w={170} styles={{input:{backgroundColor:'var(--mantine-color-dark-8)',border:0}}} placeholder='Search' rightSection={<IconSearch/>}/>
             <Text fw='bold' size='xs' mt={30} mb={5} pr={40}>USER SETTINGS</Text>
 
             <NavButton value="account">My Account</NavButton>
             <NavButton value="profiles">Profiles</NavButton>
             <NavButton value="privacy">Privacy & Safety</NavButton>
 
        </Flex>
        <Flex w={"70%"} gap={10} pl={30} pt={45} direction={'column'} bg={'dark.8'}>
            {children}
        </Flex>
     </Flex>
    );
  }
  