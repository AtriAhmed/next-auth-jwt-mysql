'use client'
import axios from 'axios'
import CountdownTimer from './components/CountDownTimer'
import Swal from 'sweetalert2'

import { signOut, signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
export default function Home() {
  const { data: session, status } = useSession({})
  const [isSubscribed,setIsSubscribed] = useState(false)

function getIsSubscribed(){
  if(status == "authenticated")
  axios.get("/api/registration/is-subscribed").then(res=>{
    setIsSubscribed(res.data.isSubscribed)
        })
}

  useEffect(()=>{
  getIsSubscribed()
  },[status])

  const handleSubscribe = () => {
    if (status == "unauthenticated") {
      signIn()
    } else {
      axios.post("/api/registration").then(res => {
        Swal.fire("Success", "You are successfully subscribed","success")
        getIsSubscribed()
      }).catch(err=>{
        Swal.fire("Error","Sorry there was a problem, try again later", "error")
      })
    }
  }

  const handleUnsubscribe = () => {
    if (status == "unauthenticated") {
      signIn()
    } else {
      axios.post("/api/registration/unsubscribe").then(res => {
        Swal.fire("Success", "You are successfully unsubscribed","success")
        getIsSubscribed()
      }).catch(err=>{
        Swal.fire("Error","Sorry there was a problem, try again later", "error")
      })
    }
  }
  return (
    <main className="flex gap-6 flex-col items-center justify-center p-24 text-orange-500 relative overflow-hidden">
      <div className="flex justify-end w-full">
        {session?.user?.name ? <div className='flex gap-4'><div className='capitalize font-bold'>{session.user.name}</div><div><button className='flex' onClick={()=>{signOut().then(res=>{Swal.fire("Success", "Logged out successfully","success")})}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
</button></div></div> : <div><button className='font-bold' onClick={()=>{signIn()}} >LOGIN</button></div> }
      </div>
      <div className='flex gap-4 items-center '>


        <div className="text-6xl">Orientation universitaire 2023</div>
      </div>
      <div className='flex gap-4 justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>


        <div className="text-4xl font-">Maison de Jeunes Kerkennah</div>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
        </svg>
        <div className="text-3xl ">20 Juillet 2023 20:00</div>
      </div>
      <div className="w-full before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-orange-200 after:via-orange-300 after:blur-2xl after:content-[''] before:lg:h-[360px]">

        <CountdownTimer />

      </div>
      {
isSubscribed ?  <button onClick={handleUnsubscribe} disabled={status == "loading"} className="font-bold text-xl border-2 border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white transition duration-300 font- py-2 px-8 rounded-full">
UNSUBSCRIBE
</button> :
      <button onClick={handleSubscribe} disabled={status == "loading"} className="font-bold text-xl border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-500 hover:text-white transition duration-300 font- py-2 px-8 rounded-full">
        SUBSCRIBE
      </button>
      }

    </main>
  )
}
