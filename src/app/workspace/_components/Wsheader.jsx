import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Wsheader = () => {
  return (
    <div className='flex justify-between px-5 shadow-md'>
        <Link href="/dashboard"><Image src={"/logo.svg"} height={140} width={120} alt='logoimg'></Image></Link>
        <UserButton/>

    </div>
  )
}

export default Wsheader