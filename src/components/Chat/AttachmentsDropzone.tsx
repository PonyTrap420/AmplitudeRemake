import { useEffect } from "react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { FileWithPath } from "@mantine/dropzone";

const ACCEPTED_TYPES = ["image/*", "video/mp4"];

export default function Attachments(props: Partial<DropzoneProps>) {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        Array.from(items).forEach((item) => {
                if (item.type.startsWith("image") || item.type === "video/mp4") { 
                    const file = item.getAsFile();
                    if (file) {
                        props.onDrop?.([file as FileWithPath]); 
                    }
                }
            });
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, []);

    return (
        <Dropzone accept={ACCEPTED_TYPES} onDrop={props.onDrop ?? (() => {})} {...props}>
            <IconCirclePlusFilled cursor={"pointer"} size={30} />
        </Dropzone>
    );
}
