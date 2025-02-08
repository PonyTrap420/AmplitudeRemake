import useSWR from 'swr';
import axios from 'axios';
import { Message } from '@/types/Message';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useChannelMessages(channelId: string) {
    const { data, error, isLoading, mutate } = useSWR<Message[]>(
        `/api/channels/${channelId}/messages`,
        fetcher
    );

    return {
        messages: data || [],
        isLoading,
        isError: error,
        mutate
    };
} 