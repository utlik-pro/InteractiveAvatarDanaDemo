"use client";

import {
  AvatarQuality,
  StartAvatarRequest,
} from "@heygen/streaming-avatar";

import { useEffect } from "react";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { StreamingAvatarProvider } from "./logic";
import { AVATARS } from "@/app/lib/constants";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";

// НЕ указываем здесь token, потому что он не входит в тип StartAvatarRequest
const defaultConfig: StartAvatarRequest = {
  quality: AvatarQuality.Low,
  avatarName: AVATARS[0].avatar_id,
  knowledgeId: undefined,
  voice: {
    voiceId: "default",
  },
};

const AvatarSessionWrapper = () => {
  const { startAvatar } = useStreamingAvatarSession();

  useEffect(() => {
    const stored = localStorage.getItem("avatarConfig");
    const config: StartAvatarRequest = stored
      ? JSON.parse(stored)
      : defaultConfig;

    const token = process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "";

    if (!token) {
      console.error("❌ HEYGEN_TOKEN is missing");
      return;
    }

    // ВАЖНО: передаём token вторым аргументом
    startAvatar(config, token);
  }, [startAvatar]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <AvatarVideo />
      <AvatarControls />
      <MessageHistory />
    </div>
  );
};

export default function InteractiveAvatar() {
  return (
    <StreamingAvatarProvider>
      <AvatarSessionWrapper />
    </StreamingAvatarProvider>
  );
}
