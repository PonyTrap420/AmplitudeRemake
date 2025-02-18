import { useState } from "react";
import { Box, Flex, Text, Modal } from "@mantine/core";
import { Image } from "@mantine/core";

export default function Attachment({ name, url }: { name: string; url: string }) {
  const [opened, setOpened] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setOpened(true); // Function to open the modal
  const handleCloseModal = () => setOpened(false); // Function to close the modal

  return (
    <Flex p={10} direction="column" bg="dark.6" w={170} align="center">
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
