export type Channel = {
    id: string;
    name: string;
    serverId: string;
    type: 'text' | 'voice';
    isPrivate: boolean;
    categoryId?: string;
    position: number;
    createdAt?: Date;
}; 