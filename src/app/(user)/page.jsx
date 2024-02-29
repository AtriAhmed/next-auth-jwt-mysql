'use client'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession({})
const [loading, setLoading] = useState(true)

useEffect(()=>{
if(session)
if(session.user) setLoading(false)
},[status])

if(loading) return <div>LOADING...</div>
  return (
    <main className="">
        {session?.user?.name ? <div className='text-black'>{session.user.name}</div> : 
        <div>No user connected</div> }
  
    </main>
  )
}