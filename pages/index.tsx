import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div className="container py-20">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">ANIME LIST</h1>
        <button className="border rounded-md px-4 py-2" onClick={() => router.push("/search")}>Search Anime</button>
      </div>  
    </div>
  )
}

export default Home
