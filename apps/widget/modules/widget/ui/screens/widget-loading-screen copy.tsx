"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atom";
import { WidgetHeader } from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAction, useMutation} from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";

type InitStep= "org"|"session"|"settings"|"vapi"|"done";
export const WidgetLoadingrScreen=({organizationId}:{organizationId:string |null})=>{
    const[step,setStep]=useState<InitStep>("org");
    const[sessionvalid,setSessionValid]=useState(false);
    const loadingMessage=useAtomValue(loadingMessageAtom);
    const setLoadingMessage=useSetAtom(loadingMessageAtom)
    const setErrorMessage=useSetAtom(errorMessageAtom);
    const setOrgainzationId=useSetAtom(organizationIdAtom);
    const contactSessionId=useAtomValue(contactSessionIdAtomFamily(organizationId || ""))
    const setScreen=useSetAtom(screenAtom);
    
    const validateOrganization=useAction(api.public.organizations.validate);
    useEffect(()=>{
        if(step !=="org"){
            return;
        }
        setLoadingMessage("Finding Organization ID...");
        if(!organizationId){
            setErrorMessage("Organization id required");
            setScreen("error");
            return;
        }
        setLoadingMessage("Verifying Organization...")
        validateOrganization({organizationId}).then((result)=>{
            if(result.valid){
                setOrgainzationId(organizationId)
                setStep("session")
            }
            else{
                setErrorMessage(result.reason || "Invalid configuration")
                setScreen("error")
            }
        }).catch(()=>{
            setErrorMessage("Unable to verify organization")
            setScreen("error")
        })

    },[step,organizationId,setErrorMessage,setScreen,setLoadingMessage,validateOrganization,setStep,setOrgainzationId])

    const validateContactSession=useMutation(api.public.contactSessions.validate);
    useEffect(()=>{
        if(step !=="session"){
            return;
        }

        setLoadingMessage("Finding contact session id...")

        if(!contactSessionId){
            setSessionValid(false)
            setStep("done")
            return
        }
        setLoadingMessage("Verifying session...")

        validateContactSession({
            contactSessionId:contactSessionId as Id<"contactSessions">,
        }).then((result)=>{
            setSessionValid(result.valid)
            setStep('done')
        }).catch(()=>{
            setSessionValid(false)
            setStep("done")
        })

    },[step,contactSessionId,setLoadingMessage,validateContactSession])

    useEffect(()=>{
        if(step!=="done"){
            return
        }
        const hasValidSession=contactSessionId && sessionvalid;
        setScreen(hasValidSession?"selection":"auth")
    },[ contactSessionId, sessionvalid, setScreen, step])
    return(
        <>
        <WidgetHeader>
            <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className="fonttext-3xl">Hi there 👋</p>
                    <p className="text-lg">Let's get you started</p>
            </div>
        </WidgetHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
            <LoaderIcon className="animate-spin"/>
            <p className="text-sm">
               {loadingMessage || "loading..."}
            </p>
        </div>
        </>
    )
}