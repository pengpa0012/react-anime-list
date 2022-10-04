import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/Components/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>React Anime List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com" defer></script>
      </Head>
      { router.pathname == "/" || router.pathname == "/search" || router.pathname == "/profile"  ?  <Navbar /> : undefined }
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
