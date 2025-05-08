"use client";

import { useEffect, useState } from "react";
import { AvatarConfig } from "@/components/AvatarConfig";
import { StartAvatarRequest, AvatarQuality } from "@heygen/streaming-avatar";
import { AVATARS } from "@/app/lib/constants";

export default function SettingsPage() {
  const [config, setConfig] = useState<StartAvatarRequest>(() => {
    const stored = localStorage.getItem("avatarConfig");
    return stored
      ? JSON.parse(stored)
      : {
          quality: AvatarQuality.Low,
          avatarName: AVATARS[0].avatar_id,
          knowledgeId: undefined,
          voice: {
            voiceId: "default",
          },
        };
  });

  useEffect(() => {
    localStorage.setItem("avatarConfig", JSON.stringify(config));
  }, [config]);

  return (
    <div className="w-full min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Настройки аватара</h1>
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-3xl">
        <AvatarConfig config={config} onConfigChange={setConfig} />
      </div>
    </div>
  );
}
