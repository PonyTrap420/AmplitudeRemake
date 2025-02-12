'use client'

import { Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import path from "path";

export default function NavButton({value, children}:{value:string, children:ReactNode})
{
    const pathname = path.basename(usePathname());
    return <Link href={value}><Button w={170} size="xs" justify='start' variant={pathname==value?'default':'subtle'}>{children}</Button></Link>
}