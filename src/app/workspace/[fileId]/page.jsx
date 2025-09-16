"use client"
import { useParams } from 'next/navigation'
import React, { use, useEffect } from 'react'
import Wsheader from '../_components/Wsheader'
import Pdfviewer from '../_components/pdfviewer'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import TextEditor from '../_components/TextEditor'
import { useUser } from '@clerk/nextjs'
import { Router, useRouter } from 'next/navigation'

const Workspace = () => {
    const {fileId} = useParams()
     const getfilefromurl =  useQuery(api.fileupload.Getfilefromquery,{
        fileId:fileId 
    })
    const router = useRouter()
    const {user} = useUser()
    useEffect(()=>{
      if(!user){
        router.push("/auth/sign-in");
      }
    },[user,router])
   
  return (
    <div className=''>
        <Wsheader/>
        <div className='grid grid-cols-2 gap-5'>
        <div>
           <TextEditor/>
        </div>
        <div>
            <Pdfviewer fileinfo={getfilefromurl?.[0]?.fileUrl}/>
        </div>
        </div>
    </div>
  )
}

export default Workspace