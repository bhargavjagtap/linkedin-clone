import Head from 'next/head'
import {signOut} from "next-auth/react"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      LinkedIn Clone
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
