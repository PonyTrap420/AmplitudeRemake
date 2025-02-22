import { Box, Image, Modal, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export default function AttachmentContent({ urls }: { urls: string[] }) {
  const [opened, setOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
    setOpened(true);
  };

  const handleCloseModal = () => setOpened(false);
  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : urls.length - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev < urls.length - 1 ? prev + 1 : 0));

  return (
    <Box style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {urls.length >= 7 ? (
        <Flex direction={'column'}>
        <Button onClick={() => handleOpenModal(0)} variant='transparent' size='xs'>Click to view all content</Button>
        <Box
          maw={250}
          mah={200}
          pos="relative"
          style={{cursor: "pointer", borderRadius: "8px", overflow: "hidden" ,}}
          onClick={() => handleOpenModal(0)}
        >
          <Image src={urls[0]} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", filter:'blur(4px)' }} />
        </Box>
        </Flex>
      ) : (
        <Box
          h={"100%"}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${urls.length <= 3 ? urls.length : 3}, 1fr)`,
            gap: "8px",
          }}
        >
          {urls.map((url, index) => (
            <Box
              key={index}
              maw={250}
              mah={200}
              pos="relative"
              style={{ cursor: "pointer", borderRadius: "8px", overflow: "hidden" }}
              onClick={() => handleOpenModal(index)}
            >
              <Image src={url} alt={`attachment-${index}`} style={{height:urls.length==1?'100%':''}}/>
            </Box>
          ))}
        </Box>
      )}

      {opened && (
        <Modal
          styles={{ inner: { left: 0, padding: 0, height: "100%" },content:{backgroundColor:'transparent',boxShadow:'none'} }}
          opened={opened}
          onClose={handleCloseModal}
          size="auto"
          padding={0}
          centered
          withCloseButton={false}
        >
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            {urls.length >= 7 && (
              <Button variant="transparent" onClick={handlePrev} size="lg">
                <IconArrowLeft size={24} />
              </Button>
            )}
            <Image src={urls[currentIndex]} alt={`modal-image-${currentIndex}`} style={{ maxWidth: "100%", maxHeight: window.screen.height / 2 }} />
            {urls.length >= 7 && (
              <Button variant="transparent" onClick={handleNext} size="lg">
                <IconArrowRight size={24} />
              </Button>
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
}