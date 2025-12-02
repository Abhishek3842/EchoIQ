"use client";

import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atom";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export const WidgetChatScreen = () => {
  const setScreen=useSetAtom(screenAtom)
  const setConversationId=useSetAtom(conversationIdAtom)  
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );
  const onBack=()=>{
    setConversationId(null)
    setScreen("selection")
  }
  return (
    <>
      <WidgetHeader className="flex items-center justify-between h-[50px] pl-1.5">
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant="transparent">
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button size="icon" variant="transparent" onClick={onBack}>
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col  gap-y-4 p-4 ">
        {JSON.stringify(conversation)}
      </div>
    </>
  );
};
