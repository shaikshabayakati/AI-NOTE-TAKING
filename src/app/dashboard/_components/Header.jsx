"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const {user} = useUser()
  return (
    <div className='flex justify-end p-8 shadow-md'>
      
      {user?<UserButton></UserButton>:<Link href="auth/sign-in"><Button>sign-in</Button></Link>}
    </div>
  )
}

export default Header