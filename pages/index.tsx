import { Container, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import CreateNote from '../components/Notes/CreateNote';
import PocketBase from "pocketbase"
import { StatsGroup } from '../components/GroupedStats/GroupedStats';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {


  const [monthCount, setMonthCount] = useState(0)
  const [monthTotalValue, setMonthTotalValue] = useState(0)

  useEffect(() => {
    fetchStats()
  }, [])


  const fetchStats = async () => {

    const client = new PocketBase(process.env.NEXT_PUBLIC_HOST);

    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));

    console.log(today)
    console.log(priorDate.toISOString());

    const resultList = await client.records.getList('notes', 1, 50, {
      // filter: `created >= "2022-11-12 00:00:00"`,
      filter: `created >= "${priorDate.toISOString()}"`,
    });

    setMonthCount(resultList.totalItems)
    let totalVal = 0
    resultList.items.forEach((item) => {
      totalVal += item.lost
    })
    setMonthTotalValue(totalVal)


  }



  return (
    <>
      <Welcome />
      <Space h="xl" />
      <Container size="sm" >

        <StatsGroup data={[
          { title: 'Dollars scammed', stats: `$${monthTotalValue}`, description: 'The reported amount of money lost through scams in the last 30 days' },
          { title: 'Total Scams', stats: `${monthCount}`, description: 'Total scams reported for the last 30 days' },
          { title: 'Scam searches', stats: '100', description: 'Searches for scams in the last 30 days' },
        ]} />
      </Container>
    </>
  );
}
