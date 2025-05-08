"use client";

import {
  AvatarQuality,
  StartAvatarRequest,
} from "@heygen/streaming-avatar";

import { useEffect } from "react";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { StreamingAvatarProvider } from "./logic";
import { AVATARS } from "@/app/lib/constants";
import { useRouter } from "next/navigation";

export default function InteractiveAvatar() {
  const { startAvatar, stopAvatar, sessionState } = useStreamingAvatarSession();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("avatarConfig");
    const config: StartAvatarRequest = stored
      ? JSON.parse(stored)
      : {
          quality: AvatarQuality.Low,
          avatarName: AVATARS[0].avatar_id,
          knowledgeId: undefined,
          voice: {
            voiceId: "default",
          },
        };

    const token = process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "";
    if (!token) {
      router.push("/errors/MissingToken");
      return;
    }

    const init = async () => {
      try {
        await stopAvatar();
        await startAvatar({ ...config, token });
      } catch (error: any) {
        const message = error?.message || "";
        if (message.includes("active session")) {
          router.push("/errors/ActiveSession");
        } else if (message.includes("401") || message.includes("Unauthorized")) {
          router.push("/errors/Unauthorized");
        } else {
          router.push("/errors/UnhandledError");
        }
      }
    };

    init();
  }, []);

  return (
    <StreamingAvatarProvider>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <AvatarVideo />
        <AvatarControls />
        <MessageHistory />
      </div>
    </StreamingAvatarProvider>
  );
}
