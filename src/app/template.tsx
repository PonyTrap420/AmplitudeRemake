"use client";

import { Flex } from "@mantine/core";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <Flex pos={'relative'} h="100%" w={"100%"}>
        {children}
      </Flex>
    </motion.div>
  );
}
