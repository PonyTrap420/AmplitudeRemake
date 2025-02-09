import useSWR from 'swr';
import axios from 'axios';
import { Server } from './useServers';
import { Channel } from '@/types/Channel';

export type Category = {
    id: string;
    name: string;
    channels: Channel[];
    position: number;
};

export type ServerWithChannels = Server & {
    channels: Channel[];
    categories: Category[];
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useServer(serverId: string) {
    const { data, error, isLoading, mutate } = useSWR<ServerWithChannels>(
        `/api/server/${serverId}`,
        fetcher
    );

    return {
        server: data,
        isLoading,
        isError: error,
        mutate
    };
}