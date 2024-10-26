import { IconBlobFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"

export default function BlobAnimated({color}:{color:string | undefined})
{
    return <motion.div
    initial={{ opacity: 0 }}
    animate={{ x: 0, opacity:1 }}
    transition={{ type: "spring", stiffness: 30,delay:0.8, duration:1000 }}
    >
        <IconBlobFilled color={color} size="20vw"/>
    </motion.div>
}