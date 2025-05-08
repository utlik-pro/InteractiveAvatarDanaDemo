"use client";

import { AvatarConfig } from "@/components/AvatarConfig";

export default function SettingsPage() {
  return (
    <div className="w-full min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Настройки аватара</h1>
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-3xl">
        <AvatarConfig />
      </div>
    </div>
  );
}
