import { prisma } from "@/lib/prisma";

export async function getUser(id:string)
{
    const users = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select:{
            id:true,
            username:true,
            displayName:true,
            avatar:true,
            banner:true,
            accent_color:true,
            banner_color:true,
            status:true
        }
      });

    return users;
}