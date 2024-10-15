'use client'

import { useEffect, useState } from "react";
import Chat from "@/components/Chat/Chat";
import ChatSkeleton from "@/components/Chat/ChatSkeleton";
import { Message } from "@/types/Message";

export default function ChatContent() {
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const fetchMessages = async () => {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
      const data = await import("@/.mock/messages.json");
      const messages: Message[] = data.default as unknown as Message[];
      setMessages([...messages].reverse());
    };

    fetchMessages();
  }, []);

  if (!messages) {
    return <ChatSkeleton />;
  }

  return <Chat messages={messages} />;
}
