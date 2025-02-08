import useSWR from 'swr';
import axios from 'axios';
import { Server } from './useServers';

export type Channel = {
    id: string;
    name: string;
    serverId: string;
};

export type ServerWithChannels = Server & {
    channels: Channel[];
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