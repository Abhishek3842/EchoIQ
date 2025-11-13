"use client";

import {useQuery,Authenticated, Unauthenticated} from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import { SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users=useQuery(api.users.getMany);
  return (
    <>
    <Authenticated>
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <UserButton/>
        <p>apps/web</p>
        {JSON.stringify(users)}
      </div>
    </div>
    </Authenticated>
    <Unauthenticated>
      <p>must be sign in !</p>
      <SignInButton/>
    </Unauthenticated>
  </>
  )
}
