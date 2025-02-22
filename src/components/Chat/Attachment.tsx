import { useState } from "react";
import { Box, Flex, Text, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { Image } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { AttachmentType } from "./ChatInput";

export default function Attachment({ attachment, handleRemove }: { attachment: AttachmentType, handleRemove:(id:string)=>void }) {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);
  const url = URL.createObjectURL(attachment.file);

  return (
    <Flex pos='relative' p={10} direction="column" bg="dark.6" w={170} align="center">
      <Flex bg='dark.8' className="rounded hover:shadow-lg" top={0} right={-10} pos='absolute' style={{zIndex:2}}>
        <Tooltip label="Modify Attachment">
          <ActionIcon size={'sm'} variant='subtle'><IconPencil size={15}/></ActionIcon>
        </Tooltip>
        <Tooltip label="Remove Attachment">
          <ActionIcon onClick={()=>{handleRemove(attachment.id)}} size={'sm'} variant='subtle' c={'red'}><IconTrash size={15}/></ActionIcon>
          </Tooltip>
      </Flex>
      <Box
        w={"100%"}
        h={135}
        pos="relative"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      >
        <Image src={url} alt={attachment.file.name} />
      </Box>
      <Box p={0} w={"100%"}>
        <Text
          mt={10}
          style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
          fz="xs"
        >
          {attachment.file.name}
        </Text>
      </Box>

     {/* Modal for full-size image */}
     {opened?
         <Modal
         styles={{ inner: { left: 0, padding: 0, height: "100%" },content:{backgroundColor:'transparent',boxShadow:'none'} }}
         opened={opened}
         onClose={handleCloseModal}
         size="auto"
         padding={0}
         centered
         withCloseButton={false}
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
              alt={attachment.file.name}
              style={{ maxWidth: "100%", maxHeight: window.screen.height / 2 }} 
            />
          </Box>
        </Modal>:null}
      
    </Flex>
  );
}
