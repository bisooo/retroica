'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import medusaClient from '@/lib/medusaClient'

export default function HomePage() {
    const [customer, setCustomer] = useState(null)
    const router = useRouter()
  
    useEffect(() => {
      const fetchCustomer = async () => {
        try {
          const { customer } = await medusaClient.customers.retrieve()
          setCustomer(customer)
        } catch (error) {
          console.error('Error fetching customer:', error)
          router.push('/')  // Redirect to landing page if not authenticated
        }
      }
  
      fetchCustomer()
    }, [router])
  
    const handleLogout = async () => {
      try {
        await medusaClient.auth.deleteSession()
        router.push('/')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }
  
    if (!customer) {
      return <div>Loading...</div>
    }
  
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome, {customer.first_name}!</CardTitle>
            <CardDescription>You are now signed in to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Email: {customer.email}</p>
            <Button onClick={handleLogout}>Log Out</Button>
          </CardContent>
        </Card>
      </div>
    )
  }