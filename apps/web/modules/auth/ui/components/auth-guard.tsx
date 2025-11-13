"use client";

import { Authenticated,Unauthenticated,AuthLoading } from "convex/react";
import { AuthLayout } from "../layouts/auth-layout";
import { SignInView } from "../views/sign-in-view";
import { SpinnerBadge } from "@workspace/ui/components/spinner-badge"; 

export const AuthGuard=({children}:{children:React.ReactNode})=>{
    return (
    <>
        <AuthLoading>
            <AuthLayout>
                <div className="flex justify-center items-center h-screen">
                     <SpinnerBadge/>
                </div>
            </AuthLayout>
        </AuthLoading>
        <Authenticated>
            {children}
        </Authenticated>
        <Unauthenticated>
            <AuthLayout>
                <SignInView/>
            </AuthLayout>
        </Unauthenticated>
    </>
    )
}