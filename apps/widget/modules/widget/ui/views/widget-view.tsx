"use client";

import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atom";
import { error } from "console";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingrScreen } from "../screens/widget-loading-screen copy";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen copy";
import { WidgetChatScreen } from "../screens/widget-chat-screen copy";

interface Props{
    organizationId:string |null;
}

export const WidgetView=({organizationId}:Props)=>{
    const screen=useAtomValue(screenAtom);

    const screenComponents={
        error:<WidgetErrorScreen/>,
        loading:<WidgetLoadingrScreen organizationId={organizationId}/>,
        auth:<WidgetAuthScreen/>,
        voice:<p>TODO: Voice</p>,
        inbox:<p>TODO: Inbox</p>,
        selection:<WidgetSelectionScreen/>,
        chat:<WidgetChatScreen/>,
        contact:<p>TODO: Contact</p>,


    }
    return(
        <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {screenComponents[screen]}
    
            {/* <div className="flex flex-1">
            Widget View: {organizationId} 
            </div> */}
            {/* <WidgetFooter/> */}
        </main>
    )
}