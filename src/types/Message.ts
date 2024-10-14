export type Message = {
    id: number
    channel_id:number,
    author: Author,
    pinned:boolean,
    meantion_everyone: boolean

    content:string;
    mentions: UserID[];
    attachments: string[],
    embeds: Embed[]
    timestamp: Date,
    edited_timestamp: Date,
}

type UserID = {
    id:number;
}

type Embed = {
    type: 'link' | 'server',
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

type Author = {
    id:string,
    username: string,
    avatar: string,
    banner:string,
    accent_color: string,
    banner_color: string
}