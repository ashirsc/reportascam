import { Anchor, Box, Button, Text } from "@mantine/core";

import Link from "next/link";
import { useRouter } from 'next/router'

export default function NavLink({ href, text }: { href: string; text: string }) {
    const router = useRouter()

    const isLinkActive = href === router.asPath
    // const isLinkActive = true

   

    return <Link href={href}>
        {/* <Box
            sx={(theme) => ({
                // background: theme.fn.linearGradient(45, 'red', 'blue'),
                background: isLinkActive ? theme.fn.gradient({from: 'indigo', to: "cyan"}) : (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]),
                textAlign: 'center',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                cursor: 'pointer',

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
            })}
        >
            <Text color={isLinkActive ? "white" : undefined}>

                {text}
            </Text>
          

        </Box> */}

<Button variant={isLinkActive ? "gradient" : "subtle"}>
      {text}
    </Button>
    </Link>

}