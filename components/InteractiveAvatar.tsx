"use client";

import { useEffect, useState } from "react";
import { AvatarQuality } from "@heygen/streaming-avatar";

import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { StreamingAvatarProvider } from "./logic";
import { AVATARS } from "@/app/lib/constants";

// Загружаем токен из ENV
const TOKEN = process.env.NEXT_PUBLIC_HEYGEN_TOKEN;

export default function InteractiveAvatar() {
  const { startAvatar, stopAvatar, sessionState } = useStreamingAvatarSession();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!TOKEN) {
        console.error("❌ HEYGEN token is missing.");
        return;
      }

      try {
        const stored = localStorage.getItem("avatarConfig");
        const config = stored
          ? JSON.parse(stored)
          : {
              quality: AvatarQuality.Low,
              avatarName: AVATARS[0].avatar_id,
              knowledgeId: undefined,
              voice: {
                voiceId: "default",
              },
            };

        await stopAvatar(); // На всякий случай остановим предыдущую
        await startAvatar({ ...config, token: TOKEN });
        setInitialized(true);
      } catch (error) {
        console.error("🚨 Failed to start avatar:", error);
        if (error?.message?.includes("already an active session")) {
          window.location.href = "/session-exists";
        } else if (error?.message?.includes("401")) {
          window.location.href = "/unauthorized";
        } else {
          window.location.href = "/error";
        }
      }
    };

    init();
  }, []);

  if (!initialized) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-gray-600">Запуск аватара...</span>
      </div>
    );
  }

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
