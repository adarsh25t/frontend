import React from 'react'
import './footer.css'

function Footer() {

    const currentYear = new Date(Date.now()).getFullYear();

  return (
    <div>
        <p className='text-center text-base text-primary py-5'>Shopify-app - All rights reserved. Copyright &copy; {currentYear}</p>
    </div>
  )
}

export default Footer