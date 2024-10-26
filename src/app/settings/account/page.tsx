import { Button, Flex, Title, Text } from "@mantine/core";

export default function MyAccount()
{
    return <>
        <Title size='h3'>My Account</Title>
        <Flex bg='dark.6' w={400} h={300}>
            
        </Flex>
        <Title size='h3'>Password and Authentication</Title>
        <Button w={170} variant='default'>Change Password</Button>
        <Text size='xs'>ACCOUNT REMOVAL</Text>
        <Button w={170} variant='outline' color='#F23D3D'>Delete Account</Button>
    </>
}