import { Button, Flex, Title, Text } from "@mantine/core";

export default function MyAccount()
{
    return <>
        <Title size='h3'>My Account</Title>
        <Flex bg='dark.6' w={400} h={300}>
            
        </Flex>
        <Flex direction='column' gap={10}>
            <Title size='h4'>Password and Authentication</Title>
            <Button size="xs" w={170} variant='default'>Change Password</Button>
        </Flex>

        <Flex direction='column' gap={10}>
            <Text c='grey' fw='bold' size='xs'>ACCOUNT REMOVAL</Text>
            <Button size="xs" w={170} variant='outline' color='#F23D3D'>Delete Account</Button>
        </Flex>
    </>

}