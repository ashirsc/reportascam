import { Anchor, AppShell, Box, Burger, ColorScheme, ColorSchemeProvider, Drawer, Group, Header, MantineProvider, MediaQuery, NavLink, Navbar, Paper, Text, createStyles } from '@mantine/core';
import NextApp, { AppContext, AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import CustomNavLink from '../components/NavLink/NavLink';
import Head from 'next/head';
import Link from 'next/link'
import NavSearch from '../components/NavSearch/NavSearch';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

const useStyles = createStyles((theme, _params, getRef) => ({}))
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const { height, width } = useViewportSize();
  const [smallMenuOpen, setSmallMenuOpen] = useState(false)

  const { theme } = useStyles();

  const mobileSize = width > theme.breakpoints.sm






  return (
    <>
      <Head>
        <title>Report a scam</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppShell
              padding="xl"
              header={
                <Header height={60} p="xs">
                  <Group position='apart'>
                    <Link href={"/"}>
                      <Text ml={"lg"}>Report a scam</Text>
                    </Link>

                    {mobileSize ?

                      <Group
                        mt={0}
                        mb={0}
                      >
                        <CustomNavLink href="/report" text="Report" />
                        <CustomNavLink href="/browse" text="Browse" />
                        <NavSearch />


                        <ColorSchemeToggle />
                      </Group>
                      : <>
                        <Burger
                          opened={smallMenuOpen}
                          onClick={() => setSmallMenuOpen((o) => !o)}
                          title={"Menu"}
                        />
                        <Drawer position="right"
                          opened={smallMenuOpen}
                          onClose={() => setSmallMenuOpen(false)}

                        >
                          <CustomNavLink href="/report" text="Report" mobileSize />
                          <CustomNavLink href="/browse" text="Browse" mobileSize/>
                        </Drawer>

                      </>
                    }


                  </Group>
                </Header>
              }
            >

              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
