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

const defaultConfig: StartAvatarRequest = {
  quality: AvatarQuality.Low,
  avatarName: AVATARS[0].avatar_id,
  knowledgeId: undefined,
  voice: {
    voiceId: "default",
  },
};

export default function InteractiveAvatar() {
  const { startAvatar } = useStreamingAvatarSession();

  useEffect(() => {
    const stored = localStorage.getItem("avatarConfig");
    const config: StartAvatarRequest = stored
      ? JSON.parse(stored)
      : defaultConfig;

    startAvatar(config);
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
