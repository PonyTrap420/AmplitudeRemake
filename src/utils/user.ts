import { $Enums } from "@prisma/client";

export function statusToColor(status:$Enums.UserStatus)
{
    switch(status){
        case 'online':
            return '#23a55a';
        case 'idle':
            return '#f0b232';
        case 'dnd':
            return '#f23f43';
        case 'offline':
            return 'gray';
    }
}

export function statusToText(status:$Enums.UserStatus | string){
    switch(status){
        case 'online':
            return 'Online';
        case 'idle':
            return 'Idle';
        case 'dnd':
            return 'Do Not Disturb';
        case 'offline':
            return 'Offline';
    }
}