import { Avatar, Container, Group, Paper, Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
    },
}));

interface CommentSimpleProps {
    postedAt: string;
    body: string;
    platform:string
    lost? : string
}

export function CommentSimple({ postedAt, body, platform, lost }: CommentSimpleProps) {
    console.log(lost)
    const { classes } = useStyles();
    return (
        <Paper p={"lg"} m="lg" radius={"md"} withBorder>
            <Group position='apart'>

            <Group>
                <Avatar alt={platform} radius="xl" />
                <div>
                    <Text size="sm">{platform}</Text>
                    <Text size="xs" color="dimmed">
                        {postedAt}
                    </Text>
                </div>
            </Group>
            {!!lost && <Text size="sm" color="red">{lost}</Text>}
            </Group>
            <Text className={classes.body} size="sm">
                {body}
            </Text>
        </Paper>
    );
}