import { useState } from "react";
import { Box, Flex, Text, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { Image } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function Attachment({ name, url }: { name: string; url: string }) {
  const [opened, setOpened] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setOpened(true); // Function to open the modal
  const handleCloseModal = () => setOpened(false); // Function to close the modal

  return (
    <Flex pos='relative' p={10} direction="column" bg="dark.6" w={170} align="center">
      <Flex bg='dark.8' className="rounded hover:shadow-lg" top={0} right={-10} pos='absolute' style={{zIndex:2}}>
        <Tooltip label="Modify Attachment">
          <ActionIcon size={'sm'} variant='subtle'><IconPencil size={15}/></ActionIcon>
        </Tooltip>
        <Tooltip label="Remove Attachment">
          <ActionIcon size={'sm'} variant='subtle' c={'red'}><IconTrash size={15}/></ActionIcon>
          </Tooltip>
      </Flex>
      <Box
        w={"100%"}
        h={135}
        pos="relative"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer", // Show pointer cursor on hover
        }}
        onClick={handleOpenModal} // Open the modal when image is clicked
      >
        <Image src={url} alt={name} />
      </Box>
      <Box p={0} w={"100%"}>
        <Text
          mt={10}
          style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
          fz="xs"
        >
          {name}
        </Text>
      </Box>

     {/* Modal for full-size image */}
     {opened?
        <Modal
          styles={{
            inner: {left:0, padding: 0, height: "100%" }, // Remove padding and make inner fill the modal
          }}
          opened={opened}
          onClose={handleCloseModal}
          size="auto"
          padding={0}
          centered
          withCloseButton={false} // Disable the close button for a cleaner look
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              src={url}
              alt={name}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Modal>:null}
      
    </Flex>
  );
}
