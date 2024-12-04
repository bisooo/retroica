"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import medusaClient from "@/lib/medusaClient";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await medusaClient.auth.authenticate({
          email,
          password,
        });
      } else {
        await medusaClient.customers.create({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        });
        // Automatically log in after sign up
        await medusaClient.auth.authenticate({
          email,
          password,
        });
      }
      router.push("/"); // Redirect to the home page
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during authentication");
      }
    }
  };

  return (
    <Card className="w-full max-w-[350px] shadow-none bg-transparent border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "LOGIN" : "REGISTER"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">EMAIL</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black text-white border-[#00FF00]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black text-white border-[#00FF00]"
            />
          </div>
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">FIRST NAME</Label>
                <Input
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-black text-white border-[#00FF00]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">LAST NAME</Label>
                <Input
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-black text-white border-[#00FF00]"
                />
              </div>
            </>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-[#00FF00] text-black text-xl border border-[#000000] hover:bg-[#00FF00] hover:border-[#FFFFFF] transition-colors"
          >
            {isLogin ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-[#000000] text-white border border-[#FFFFFF] hover:bg-[#CCCCCC] hover:text-black transition-colors"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account ? Sign Up"
            : "Already have an account ? Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
