import React from 'react'
import { assets } from '../../assets/images/assets'

function Logo({width, height}) {
  return (
    <div>
        <img src={assets.shopify_logo} width={width} height={height} alt="logo" />
    </div>
  )
}

export default Logo