import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Boxes, LayoutPanelTop } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadDialog from './dialog'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='h-screen p-7 '>
      <Link href="/"><Image className="" src="/logo.svg" height={250} width={252} alt='logo'/></Link>
      <div className='flex flex-col justify-center '>
        <UploadDialog>
       </UploadDialog>
        <div className='flex p-3 cursor-pointer rounded-lg gap-2 item-center text-xl hover:bg-slate-100 justify-center mt-7'>
          <LayoutPanelTop></LayoutPanelTop>
          <h2>Workspace</h2>
        </div>
        <div className='flex p-3 cursor-pointer rounded-lg gap-2 item-center text-xl hover:bg-slate-100 justify-center mt-3'>
          <Boxes></Boxes>
          <h2>Upgrade</h2>
        </div>

      
      </div>
      <div className='absolute bottom-22 w-[80%] p-3'>
      <Progress value={33}></Progress>
      <p className=' text-sm mt-1 text-center '>2 Out Of 5 PDF'S Uploaded</p>
      <p className='text-sm mt-1 text-gray-500 text-center'>Upgrade To Use More</p>
      </div>
    </div>
  )
}

export default Sidebar