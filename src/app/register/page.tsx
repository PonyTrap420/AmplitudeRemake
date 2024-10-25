'use client'

import { Box, Flex, Overlay, Title,Text, TextInput, Button, Select, PasswordInput } from "@mantine/core";
import { IconBlobFilled } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import Link from "next/link";
import { registerUser } from "./actions";
import { useRouter } from "next/navigation";

const labelProps = {style: {fontSize:'11px',fontWeight:'700'} };
const TextInputStyle = {input:{backgroundColor:'var(--mantine-color-dark-8)', border:0}, root:{height:70}};

const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  
  const days = Array.from({ length: 31 }, (_, index) => ({
    value: `${index + 1}`,
    label: `${index + 1}`,
  }));
  
  const years = Array.from({ length: 123 }, (_, index) => ({
    value: `${2023 - index}`,
    label: `${2023 - index}`,
  }));
  
  interface RegisterValues {
    email: string;
    username: string;
    password: string;
    month: string;
    day: string;
    year: string;
  }

export default function Page(){
    const router = useRouter();

    const form = useForm({
        initialValues: {
          email: '',
          displayName: '',
          username: '',
          password: '',
          month: '',
          day: '',
          year: '',
        },
    
        // Form validation
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          displayName: (value) => (value.length >= 2 || value.length == 0 ? null : 'Display Name must have at least 2 characters'),
          username: (value) => (value.length >= 2 ? null : 'Username must have at least 2 characters'),
          password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
          month: (value) => (value ? null : 'Month is required'),
          day: (value) => (value ? null : 'Day is required'),
          year: (value) => (value ? null : 'Year is required'),
        },
      });

      const handleSubmit = async (values: RegisterValues) => {
        const { month, day, year, ...otherValues } = values;
        const dateOfBirth = new Date(`${year}-${month}-${day}`);
      
        const formData = {
          ...otherValues,
          dateOfBirth,
        };
      
        try {
          const response = await registerUser(formData);
      
          form.setErrors({});

          if (response.errors) {
            Object.keys(response.errors).forEach((field) => {
            form.setFieldError(field, response.errors[field]);
          });
          } 
          else {
            router.push('/login');
          }
        } 
        catch{
          form.setFieldError('email', 'Failed to register. Please try again.');
        }
      };

    return <Flex pos='relative' h={"100%"} w="100%">
        <Overlay blur="6vw">  
            <Flex pos='relative' w="100%" h="100%" justify='center' align='center'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex p={20} gap={0} align='center' direction='column' h={650} w={400} bg={'dark.6'}>
                    <Title size='h3'>Create an account</Title>
                    <Flex mt={20} gap={15} w="100%" direction='column'>
                        <TextInput  {...form.getInputProps('email')} styles={TextInputStyle} labelProps={labelProps} required label="EMAIL"/>
                        <TextInput  {...form.getInputProps('displayName')} styles={TextInputStyle} labelProps={labelProps} label="DISPLAY NAME"/>
                        <TextInput  {...form.getInputProps('username')} styles={TextInputStyle} labelProps={labelProps} required label="USERNAME"/>
                        <PasswordInput  {...form.getInputProps('password')} styles={TextInputStyle} labelProps={labelProps} required label="PASSWORD"/>
                        <Flex gap={5} mt={25} align='start'>
                            <Select mt={-25} {...form.getInputProps('month')} data={months} styles={TextInputStyle} labelProps={labelProps} placeholder="Month" required label="DATE OF BIRTH"/>
                            <Select {...form.getInputProps('day')} data={days} styles={TextInputStyle} placeholder="Day" labelProps={labelProps}/>
                            <Select {...form.getInputProps('year')} data={years} styles={TextInputStyle} placeholder="Year" labelProps={labelProps}/>
                        </Flex>
                        
                    </Flex>
                    <Button type="submit" w='100%' color={'#1a56d9'} variant='filled' mt={5}>Continue</Button>
                    <Flex mt={5} direction='column' gap={20} w='100%'>
                        <Text c='grey' size='xs' ta='left'>By registering, you agree to Amplitudes TOS and Privacy Policy.</Text>
                        <Link href={'/login'}><Text size='xs' c='blue'>Already have an account?</Text></Link>
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