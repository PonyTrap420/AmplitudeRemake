import { $Enums } from "@prisma/client"

export type User = {
    id: string;
    username: string;
    email?: string;
    phone?: number;
    displayName:string|null,
    avatar: string | null,
    banner:string | null,
    accent_color: string | null,
    banner_color: string | null,
    status:$Enums.UserStatus
    isSender?:boolean;
}

export enum FriendsType{
    ONLINE="Online",
    ALL = "All",
    PENDING = "Pending",
    BLOCKED = "Blocked",
    ADD = "Add Friend"
}