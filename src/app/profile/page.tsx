"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { customer, logout } = useAuth();

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center">
      {!customer ? (
        <AuthForm />
      ) : (
        <Card className="w-full max-w-[350px] shadow-none bg-transparent border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">NAME</p>
              <p className="text-lg">{`${customer.first_name} ${customer.last_name}`}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">EMAIL</p>
              <p className="text-lg">{customer.email}</p>
            </div>
            <Button
              onClick={logout}
              className="w-full bg-[#000000] text-white text-xl border border-[#FFFFFF] hover:bg-[#CCCCCC] hover:text-black transition-colors"
            >
              LOGOUT
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
