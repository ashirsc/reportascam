import { ActionIcon, Alert, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSearch, IconSun } from '@tabler/icons';

export default function NavSearch() {

  return (
    <Group position="center">
      <ActionIcon
        onClick={() => alert('Search')}
        size="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        //   color: theme.fn.gradient({from: theme.primaryColor, to: "cyan"}),
        })}
      >
       <IconSearch/>
      </ActionIcon>
    </Group>
  );
}
