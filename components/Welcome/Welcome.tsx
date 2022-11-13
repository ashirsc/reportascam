import { Anchor, Text, Title } from '@mantine/core';

import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          Report a scam
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
      Welcome to report a scam. This project was created to document scams to help protect people. We may not be able to stop all scams but we can help people avoid them.
      </Text>
    </>
  );
}
