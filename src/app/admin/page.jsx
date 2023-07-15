'use client'
import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AdminDashboard() {
    return (
        <ProtectedRoute accessId={2}>
            <div>admin dashboard</div>
        </ProtectedRoute>
    )
}
