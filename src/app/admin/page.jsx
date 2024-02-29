'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
    const { data: session, status } = useSession({})
const [loading, setLoading] = useState(true)

useEffect(()=>{
if(session)
if(session.user) setLoading(false)
},[status])

if(loading) return <div>LOADING...</div>
    return (
        <ProtectedRoute accessId={2}>
            <div className=''>admin dashboard</div>
        </ProtectedRoute>
    )
}
