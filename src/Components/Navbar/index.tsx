import React from 'react'

function Navbar() {
  return (
    <div className="flex justify-between px-12 py-6">
      <ul className="list-none flex">
        <li className="mr-8">Logo</li>
        <li className="mr-2">Link 1</li>
        <li className="mr-2">Link 2</li>
        <li className="mr-2">Link 3</li>
      </ul>
      <h2>SEARCH</h2>
    </div>
  )
}

export default Navbar