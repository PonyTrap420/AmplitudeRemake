import useSWR from 'swr';
import axios from 'axios';


export type Server = {
    id: string;
    name: string;
    ownerId: string;
    membersIDs: string[];
    createdAt: Date;
    updatedAt: Date;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useServers() {
    const { data, error, isLoading, mutate } = useSWR<Server[]>('/api/server', fetcher);

    return {
        servers: data || [],
        isLoading,
        isError: error,
        mutate
    };
} 