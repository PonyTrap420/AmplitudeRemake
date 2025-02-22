'use client'

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Chat from '@/components/Chat/Chat';
import ChatSkeleton from '@/components/Chat/ChatSkeleton';
import axios from 'axios';
import { Message } from "@/types/Message";

const fetchChat = async (url: string, id: string|unknown) => {
  const response = await axios.get(`${url}${id}`);
  return response.data;
};

export default function ChatContent({ messages = [], channelId }: { messages?: Message[], channelId?:string }) {
  const params = useParams();
  
  // Only fetch for direct messages, not server channels
  const { data, error } = useSWR(
    !channelId ? [`/api/chat/`, params.id] : null,
    ([url, id]) => fetchChat(url, id),
    { refreshInterval: 2000 }
  );

  if (error) return <div>Failed to load messages</div>;
  if (!channelId && !data) return <ChatSkeleton />;

  // Use passed messages for server channels, data.messages for direct messages
  const displayMessages = channelId ? messages : (data?.messages || []);

  return <Chat messages={displayMessages} channelId={channelId} />;
}
