'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthForm from '@/components/auth-form'  // Adjust this import path if necessary

export default function LandingPage() {
  const [showAuthForm, setShowAuthForm] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Welcome to RETROICA</CardTitle>
          <CardDescription className="text-xl text-center">
            Quality Retro Cameras At Great Prices!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {!showAuthForm ? (
            <Button onClick={() => setShowAuthForm(true)}>
              Sign In / Sign Up
            </Button>
          ) : (
            <div className="w-full">
              <AuthForm />
              <Button 
                variant="link" 
                className="mt-4" 
                onClick={() => setShowAuthForm(false)}
              >
                Back to Landing Page
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}