"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";
export default function Page() {
  const {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh p-6">
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        {/* Buttons */}
        <div className="flex flex-row items-center gap-4">
          <Button onClick={startCall}>Start Call</Button>

          <Button onClick={endCall} variant="destructive">
            End Call
          </Button>
        </div>

        {/* Connection Status */}
        <div className="flex flex-col items-center gap-1 text-sm text-gray-700">
          <p>isConnected: {String(isConnected)}</p>
          <p>isConnecting: {String(isConnecting)}</p>
          <p>isSpeaking: {String(isSpeaking)}</p>
        </div>

        {/* Transcript Box */}
        <div className="w-full bg-gray-100 rounded-lg p-4 shadow-inner max-h-[300px] overflow-auto">
          <pre className="text-xs whitespace-pre-wrap break-words">
            {JSON.stringify(transcript, null, 2)}
          </pre>
        </div>
        {/* <div className="w-full bg-black text-green-400 rounded-lg p-4 max-h-[300px] overflow-auto font-mono text-xs">
  <pre className="whitespace-pre-wrap break-words">
    {JSON.stringify(transcript, null, 2)}
  </pre>
</div> */}
      </div>
    </div>
  );
}
