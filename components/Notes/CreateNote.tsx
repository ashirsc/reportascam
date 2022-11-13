'use client';

import { Button, Input, Loader, Paper, Radio, Stack, Text, TextInput, Textarea, Title, Transition } from "@mantine/core";
import { IconAt, IconCurrencyDollar } from "@tabler/icons";

import PocketBase from "pocketbase"
import styles from "./Notes.module.css"
import { useClickOutside } from "@mantine/hooks";
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

export default function CreateNote() {

  const [loading, setLoading] = useState(false)
  const clickOutsideRef = useClickOutside(() => setLoading(false));


  const [hasLeftDescription, setHasLeftDescription] = useState(false)

  const [platform, setPlatform] = useState('phoneCall');
  const [otherPlatform, setOtherPlatform] = useState("")
  const [description, setDescription] = useState('')
  const [lost, setLost] = useState('')

  // const router = useRouter();

  const create = async () => {
    const db = new PocketBase('https://reportascam.hirschi.dev');

    setLoading(true)

    const createCall = db.records.create('notes', {
      platform,
      description,
      lost
    });

    const timer = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1_000)

    })

    await Promise.all([
      createCall, timer
    ])






    setLoading(false)
    setDescription('');
    setPlatform('phoneCall');
    setHasLeftDescription(false);
    setLost('')

    // router.refresh();
  }

  return (
    <>
      <Title order={3} mb="lg" >Report a scam that happend to you</Title>

      <Stack spacing={"md"}>

        <Radio.Group
          value={platform}
          onChange={setPlatform}
          name="favoriteFramework"
          label="How did the scammer contact you?"
          orientation="vertical"
          spacing={"xs"}
        >
          <Radio value="phoneCall" label="Phone call" />
          <Radio value="textMessage" label="Text message" />
          <Radio value="email" label="Email" />
          <Radio value="facebook" label="Facebook" />
          <Radio value="other" label="Other" />
        </Radio.Group>

        {platform == "other" &&
          <TextInput
            label="Where were you scammed?"
            placeholder="instagram"
            value={otherPlatform}
            onChange={(event: any) => setOtherPlatform(event.currentTarget.value)}
          />}



        <Textarea
          placeholder="Describe how you were scammed or what the scammer wanted you to do."
          label="Description"
          autosize
          minRows={4}
          minLength={100}
          error={hasLeftDescription && description.length < 100 ? "Please use at least 100 characters to describe what happened." : undefined}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          onBlur={() => setHasLeftDescription(true)}
        />



        <Input.Wrapper label="How much did you lose?" description={"If you didn't loose any money just leave this blank."}>

          <Input

            icon={<IconCurrencyDollar />}
            placeholder="100"
            value={lost}
            onChange={(event: any) => setLost(event.currentTarget.value)}
          />
        </Input.Wrapper>



        <Button
          onClick={create}
          loading={loading}
        // onClick={() => setLoading(true)}
        >
          Post
          {/* <Transition mounted={loading} transition={"slide-right"} duration={400} timingFunction="ease">
          {(styles) => <div style={{...styles, left: 100}}><Loader /></div>}
        </Transition> */}
        </Button>

      </Stack>
    </>
  );
}
