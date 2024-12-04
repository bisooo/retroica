'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import medusaClient from "@/lib/medusaClient";
import { Customer } from "@medusajs/medusa";

type CustomerWithoutPassword = Omit<Customer, "password_hash">;

export function useAuth() {
  const [customer, setCustomer] = useState<CustomerWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { customer } = await medusaClient.customers.retrieve();
        setCustomer(customer as CustomerWithoutPassword);
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await medusaClient.auth.authenticate({ email, password });
      const { customer } = await medusaClient.customers.retrieve();
      setCustomer(customer as CustomerWithoutPassword);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setError(null);
    try {
      await medusaClient.customers.create({ email, password, first_name: firstName, last_name: lastName });
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signup");
    }
  };

  const logout = async () => {
    try {
      await medusaClient.auth.deleteSession();
      setCustomer(null);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during logout");
    }
  };

  return { customer, login, signup, logout, isLoading, error };
}