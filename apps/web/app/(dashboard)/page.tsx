"use client";

import {useQuery,useMutation} from "convex/react"
import {api} from "@workspace/backend/_generated/api"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {Button} from "@workspace/ui/components/button"
export default function Page() {
  const users=useQuery(api.users.getMany);
  const addUser=useMutation(api.users.add);
  return (
    <>
    
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <UserButton/>
        <OrganizationSwitcher hidePersonal/>
        <Button onClick={()=>addUser()}>Add</Button>
        <p>apps/web</p>
        {JSON.stringify(users)}
      </div>
    </div>
    
    
    
  </>
  )
}
