import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div><img src='../../blogAppLogo.jpg' width={width} height={width} /></div>
  )
}

export default Logo