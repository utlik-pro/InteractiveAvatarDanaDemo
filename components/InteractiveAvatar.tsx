"use client";

import { useEffect } from "react";
import {
  AvatarQuality,
  StartAvatarRequest,
} from "@heygen/streaming-avatar";

import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { StreamingAvatarProvider } from "./logic";
import { AVATARS } from "@/app/lib/constants";

export default function InteractiveAvatar() {
  const { startAvatar, stopAvatar, sessionState } = useStreamingAvatarSession();

  useEffect(() => {
    const stored = localStorage.getItem("avatarConfig");
    const baseConfig = stored
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

    const config: StartAvatarRequest & { token?: string } = {
      ...baseConfig,
      token,
    };

    const init = async () => {
      try {
        if (sessionState) await stopAvatar(); // остановим текущую сессию
        await startAvatar(config);
      } catch (err: any) {
        if (err?.message?.includes("active session")) {
          console.warn("Avatar session already active.");
        } else {
          console.error("Failed to start avatar:", err);
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
