import { useState, useEffect } from "react";
import { Box, Flex, Text, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { Image } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { AttachmentType } from "./ChatInput";

export default function Attachment({ attachment, handleRemove }: { attachment: AttachmentType, handleRemove:(id:string)=>void }) {
  const [opened, setOpened] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);
  const url = URL.createObjectURL(attachment.file);
  const isVideo = attachment.file.type.startsWith("video/");

  useEffect(() => {
    if (isVideo) {
      const video = document.createElement("video");
      video.src = url;
      video.crossOrigin = "anonymous"; // Prevent CORS issues
      video.muted = true;
      video.playsInline = true;

      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 1; // Seek to the first second
      });

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnail(canvas.toDataURL("image/png"));
        }
      });
    }
  }, [isVideo, url]);

  return (
    <Flex pos='relative' p={10} direction="column" bg="dark.6" w={170} align="center">
      <Flex bg='dark.8' className="rounded hover:shadow-lg" top={0} right={-10} pos='absolute' style={{zIndex:2}}>
        <Tooltip label="Modify Attachment">
          <ActionIcon size={'sm'} variant='subtle'><IconPencil size={15}/></ActionIcon>
        </Tooltip>
        <Tooltip label="Remove Attachment">
          <ActionIcon onClick={() => handleRemove(attachment.id)} size={'sm'} variant='subtle' c={'red'}>
            <IconTrash size={15}/>
          </ActionIcon>
        </Tooltip>
      </Flex>

      {/* Thumbnail or Image */}
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
        {isVideo ? (
          <Image src={thumbnail || "/placeholder.jpg"} alt="Video Thumbnail" />
        ) : (
          <Image src={url} alt={attachment.file.name} />
        )}
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

      {/* Modal for full-size preview */}
      {opened ? (
        <Modal
          styles={{ inner: { left: 0, padding: 0, height: "100%" }, content: { backgroundColor: "transparent", boxShadow: "none" } }}
          opened={opened}
          onClose={handleCloseModal}
          size="auto"
          padding={0}
          centered
          withCloseButton={false}
        >
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            {isVideo ? (
              <video src={url} controls autoPlay style={{ maxWidth: "100%", maxHeight: window.screen.height / 2 }} />
            ) : (
              <Image src={url} alt={attachment.file.name} style={{ maxWidth: "100%", maxHeight: window.screen.height / 2 }} />
            )}
          </Box>
        </Modal>
      ) : null}
    </Flex>
  );
}
