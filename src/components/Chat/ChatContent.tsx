'use client'

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Chat from '@/components/Chat/Chat';
import ChatSkeleton from '@/components/Chat/ChatSkeleton';
import axios from 'axios';

const fetchChat = async (url: string, id: string|unknown) => {
  const response = await axios.get(`${url}${id}`);
  return response.data;
};


export default function ChatContent() {
  const { id } = useParams();
  const { data: data, error } = useSWR([`/api/chat/`, `${id}`], ([url, id]) => fetchChat(url, id),{refreshInterval:2000});

  if (error) return <div>Failed to load messages</div>;
  if (!data) return <ChatSkeleton />;

  return <Chat messages={data.messages?data.messages:[]} />;
}
