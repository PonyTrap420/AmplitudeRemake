import { User } from "./User";

export type Message = {
    id: number
    channel_id?:number,
    authorId: string,
    author: User,
    pinned?:boolean,
    meantion_everyone?: boolean

    content:string;
    mentions?: number[];
    attachments?: string[],
    embeds?: Embed[]
    timestamp: Date,
    edited_timestamp?: Date,
}

type Embed = {
    type: 'link' | 'server' | 'video',
    url: string,
    title: string,
    description: string,
    thumbnail: Thumbnail,
}

type Thumbnail = {
    url:string,
    proxy_url: string,
    width: number,
    height: number,
}