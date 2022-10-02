import { useRouter } from 'next/router'
import React from 'react'

function Navbar() {
  const router = useRouter()
  return (
    <div className="flex justify-between px-12 py-6">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>ANIME LIST</h1>
      <button className="border rounded-md px-4 py-2" onClick={() => router.push("/search")}>Search Anime</button>
    </div>
  )
}

export default Navbar