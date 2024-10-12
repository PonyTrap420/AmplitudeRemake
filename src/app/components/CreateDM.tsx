import { Flex,Text, Popover, PopoverDropdown, PopoverTarget, TextInput, Title, Tooltip } from "@mantine/core";

export default function CreateDM({
    children,
  }: {
    children: React.ReactNode
  }){
    return  <Popover>
    <PopoverTarget>
        <Tooltip label="Create DM">
        {children}
        </Tooltip>
    </PopoverTarget>
    <PopoverDropdown>
        <Flex direction='column' w={450} h={450}>
            <Title size='h2' fw='600'>Select Friends</Title>
            <Text>You can add 9 more friends.</Text>
            <TextInput styles={{input:{backgroundColor:'var(--mantine-color-dark-8)'}}} mt={20} placeholder="Type the username of a friend"/>
            </Flex>
    </PopoverDropdown>
</Popover>
}