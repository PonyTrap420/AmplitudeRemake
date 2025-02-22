import { useEffect } from "react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { FileWithPath } from "@mantine/dropzone";

export default function Attachments(props: Partial<DropzoneProps>) {
    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (items) {
          Array.from(items).forEach((item) => { // ✅ Convert to array
            if (item.type.startsWith("image")) {
              const file = item.getAsFile();
              if (file) {
                props.onDrop?.([file as FileWithPath]); // ✅ Safe function call
              }
            }
          });
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
    }, []);

    return (
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={props.onDrop ?? (() => {})} {...props}>
            <IconCirclePlusFilled cursor={'pointer'} size={30} />
        </Dropzone>
    );
}