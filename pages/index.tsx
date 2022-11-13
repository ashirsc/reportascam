import { Container, Space } from '@mantine/core';

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import CreateNote from '../components/Notes/CreateNote';
import { StatsGroup } from '../components/GroupedStats/GroupedStats';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Space  h="xl"/>
      <Container size="sm" >

            <StatsGroup data={[
                { title: 'Dollars scammed', stats: '1000$', description: 'The reported amount of money lost through scams in the last 30 days' },
                { title: 'Total Scams', stats: '100', description: 'Total scams reported for the last 30 days' },
                { title: 'Scam searches', stats: '100', description: 'Searches for scams in the last 30 days' },
            ]} />
        </Container>
      </>
  );
}
