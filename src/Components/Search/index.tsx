import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { fetchAPI } from '../../Utilities/Config'

type Props = {
  setAllAnime: Dispatch<SetStateAction<Object[] | undefined>>
  queryAllAnime: () => void
}

function Search({setAllAnime, queryAllAnime, ...props} : Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<any>()
  
  const onSearchAnime = () => {
    if(!searchText) return queryAllAnime()
    setLoading(true)
    fetchAPI(`https://api.jikan.moe/v4/anime?q=${searchText}&sfw`)
    .then(res => {
      setAllAnime(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    .catch(console.error)
  }

  const autoCompleteSearch = (text: any) => {
    setSearchText(text)
 
  }
    

  return (
    <div className="mb-12">
      <div className="flex">
        <input type="text" placeholder="Search" className="border rounded-tl-md rounded-bl-md p-2 focus:outline-blue-500" onChange={(e) => {
          autoCompleteSearch(e.target.value)}} />
        <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-tr-md rounded-br-md -ml-1" onClick={() => onSearchAnime()}>Search</button>
      </div>
    </div>
  )
}

export default Search