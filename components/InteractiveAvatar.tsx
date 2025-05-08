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
  const { startAvatar, stopAvatar } = useStreamingAvatarSession();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("avatarConfig");
    const config = stored
      ? {
          ...JSON.parse(stored),
          token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "",
        }
      : {
          token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "",
          quality: AvatarQuality.Low,
          avatarName: AVATARS[0].avatar_id,
          knowledgeId: undefined,
          voice: {
            voiceId: "default",
          },
        };

    const init = async () => {
      try {
        if (!config.token) {
          router.push("/errors/MissingToken");
          return;
        }

        await stopAvatar();
        await startAvatar(config);
      } catch (error: any) {
        const msg = error?.message || "Unknown";
        if (msg.includes("active session")) {
          router.push("/errors/ActiveSession");
        } else if (msg.includes("401")) {
          router.push("/errors/Unauthorized");
        } else {
          router.push("/errors/UnhandledError");
        }
        console.error("Failed to start avatar:", error);
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
