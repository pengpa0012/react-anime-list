import React, { useEffect, useState } from 'react'

type Props = {
  anime: any,
  onClick: () => void
}


function Modal({anime, onClick, ...props}: Props) { 

  return (
    <>
      <h1>modal</h1>
    </>
  )
}

export default Modal