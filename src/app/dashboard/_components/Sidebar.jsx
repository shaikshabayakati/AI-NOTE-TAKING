"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Boxes, LayoutPanelTop } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadDialog from './dialog'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

const Sidebar = () => {
  const {user} = useUser()
  return (
    <div className='h-screen p-7 '>
      <Link href="/"><Image className="" src="/logo.svg" height={250} width={252} alt='logo'/></Link>
      <div className='flex flex-col justify-center '>
        <UploadDialog>
       </UploadDialog>
       

      
      </div>
      <div className='absolute bottom-22 flex gap-5 w-[80%] p-3'>
         <UserButton/>
         <p>{user?user.fullName:null}</p>
      </div>
    </div>
  )
}

export default Sidebar