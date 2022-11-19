import { Anchor, Box, Button, NavLink as MantineNavLink, Text } from "@mantine/core";

import Link from "next/link";
import { useRouter } from 'next/router'

export default function NavLink({ href, text, mobileSize }: { href: string; text: string, mobileSize?: boolean }) {
    const router = useRouter()

    const isLinkActive = href === router.asPath
    // const isLinkActive = true

   



    return <Link href={href}>
        {mobileSize ? <MantineNavLink
            variant={isLinkActive ? "light" : "subtle"}
            label={text}
            // icon={<IconActivity size={16} stroke={1.5} />}
            // rightSection={<IconChevronRight size={12} stroke={1.5} />}
            active={isLinkActive}
        /> :
            <Button variant={isLinkActive ? "gradient" : "subtle"}>
                {text}
            </Button>
        }
    </Link>

}