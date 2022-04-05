import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Tiles from '../components/Tiles'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [selection, setSelection] = useState('movie')

  return (
    <div className={styles.container}>
      <Head>
        <title>BingeFlix</title>
        <meta name="description" content="BingeFlix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container'>
        <Navbar selection={selection} setSelection={setSelection}/>
        <Tiles selection={selection}/>
      </main>
    </div>
  )
}
