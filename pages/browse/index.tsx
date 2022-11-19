import { useEffect, useState } from "react"

import { CommentSimple } from "../../components/SimpleComment/SimpleComment"
import { Container } from "@mantine/core"
import CreateNote from "../../components/Notes/CreateNote"
import PocketBase from "pocketbase"
import { StatsGroup } from "../../components/GroupedStats/GroupedStats"
import { apiScam } from "../../types/types"

export default function NewScamPage() {

    const [lastScams, setLastScam] = useState<any[]>([])

    useEffect(() => {
        fetchScams().then((res) => setLastScam(res))


    }, [])



    const fetchScams = async () => {
        console.log(`connection to ${process.env.HOST}`)
        const db = new PocketBase(process.env.NEXT_PUBLIC_HOST);


        const records = await db.records.getFullList('notes', 200 /* batch size */, {
            sort: '-created',
        });
         return records
    }

    return <>
        <Container size="sm" >
            {lastScams.map((scam) => <CommentSimple postedAt={scam.created} body={scam.description} platform={scam.platform} lost={scam.lost} />) }

        </Container>

    </>

}