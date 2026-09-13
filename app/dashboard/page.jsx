"use client"
import {useSession, signIn, signOut} from "next-auth/react"
import React, {useEffect} from 'react'
import { useRouter } from "next/navigation";
// import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!session) {
    return null;
  }
  return <><div>Dashboard</div></>
  // return <Dashboard />;
}

export default DashboardPage