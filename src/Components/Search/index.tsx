import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { fetchAPI } from '../../Utilities/Config'

type Props = {
  setAllAnime?: Dispatch<SetStateAction<Object[] | undefined>>
  queryAllAnime?: () => void
}

function Search({setAllAnime, queryAllAnime, ...props} : Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<any>()

  useEffect(() => {
    if(router.pathname !== "/search") setSearchText("")
  }, [router.pathname])
  
  const onSearchAnime = () => {
    setLoading(true)
    router.push(`/search?q=${searchText || ""}&producer=&page=1`)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const autoCompleteSearch = (text: any) => {
    setSearchText(text)
  }
    

  return (
    <div className="flex z-50">
      <input type="text" placeholder="Search" defaultValue={router.query.q == "undefined" ? "" : router.query.q} className="border rounded-tl-md rounded-bl-md p-2 focus:outline-blue-500" onChange={(e) => {
        autoCompleteSearch(e.target.value)}} />
      <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-700/50 text-white px-4 rounded-tr-md rounded-br-md -ml-1" onClick={() => onSearchAnime()}>Search</button>
    </div>
  )
}

export default Search