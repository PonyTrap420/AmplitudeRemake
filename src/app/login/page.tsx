'use client'

import { Box, Flex, Overlay, Title,Text, TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBlobFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TextInputStyle = {input:{backgroundColor:'var(--mantine-color-dark-8)', border:0}, root:{height:70}};

export default function Page(){
    const router = useRouter();

    const form = useForm({
        initialValues: {
          email: '',
          password: '',
        },
    
        // Form validation
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
        },
      });

    const handleSubmit = async (values: {email:string, password:string}) => {    
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        });
      
        const data = await res.json();

        form.setErrors({});
        if (data.success) {
          console.log('User logged in successfully:', data.user);
          router.push('/home/friends'); 
        } else {
             Object.keys(data.errors).forEach((field) => {
            form.setFieldError(field, data.errors[field]);
          });
        }

      } catch{
        form.setFieldError('email', 'Failed to login. Please try again.');
      }
    };

    return <Flex pos='relative' w="100%">
        <Overlay blur="6vw">  
            <Flex pos='relative' w="100%" h="100%" justify='center' align='center'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex p={20} gap={0} align='center' direction='column' h={380} w={400} bg={'dark.6'}>
                    <Title size='h3'>Welcome Back!</Title>
                    <Text c='grey'>We`re so excited to see you again!</Text>
                    <Flex mt={20} gap={15} w="100%" direction='column'>
                        <TextInput {...form.getInputProps('email')}  styles={TextInputStyle} labelProps={{style: {fontSize:'11px',fontWeight:'700'} }} required label="EMAIL OR PHONE NUMBER"/>
                        <PasswordInput {...form.getInputProps('password')}  styles={TextInputStyle} labelProps={{style: {fontSize:'11px',fontWeight:'700'} }} required label="PASSWORD"/>
                        <Link href={'/home'}><Text mt={0} size='xs' c='blue'>Forgot your password?</Text></Link>
                    </Flex>
                    <Button type='submit' w='100%' color={'#1a56d9'} variant='filled' mt={20}>Log In</Button>
                    <Flex mt={5} gap={5} w='100%'>
                        <Text c='grey' size='xs' ta='left'>Need an account?</Text>
                        <Link href={'/register'}><Text size='xs' c='blue'>Register</Text></Link>
                    </Flex>
                    
              </Flex>
            </form>
            </Flex>
        </Overlay>
        <Box pos='relative' w="100%">
            <Flex w="100%" h="100%" justify='center' align='center'>
                <IconBlobFilled color="#1a56d9" size="20vw"/>
            </Flex>
        </Box>
    </Flex>
}