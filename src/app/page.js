"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";


export default function Home() {
const {user} = useUser()
const createUser = useMutation(api.user.createUser)
useEffect(()=>{
  user&&CheckUser()
},[user])
const CheckUser=async()=>{
  const result = await createUser({
    email:user?.primaryEmailAddress?.emailAddress,
    imageUrl:user?.imageUrl,
    userName:user?.fullName
  })
}
  return (
   <div >
    
    <Button>heroshima-nagasaki</Button>
    <UserButton></UserButton>

   </div>
  )
}
