import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import './style.css'
export  default function SigninPage() {
  return (
    <>
      <div className='signInpage'
      ><SignIn></SignIn> </div>
    </>
  
  )
}
