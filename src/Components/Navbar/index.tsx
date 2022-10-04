import { useRouter } from 'next/router'
import React from 'react'
import Search from '../Search'

function Navbar() {
  const router = useRouter()
  return (
    <div className="container flex justify-between py-6 px-2">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>ANIME LIST</h1>
      <Search />
    </div>
  )
}

export default Navbar