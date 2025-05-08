// app/errors/token/page.tsx
"use client";

export default function TokenErrorPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-8">
      <h1 className="text-3xl font-bold mb-4">Ошибка: Токен не указан</h1>
      <p className="text-lg mb-2">Для запуска аватара необходимо указать токен доступа к Heygen API.</p>
      <p className="text-md">Проверь переменную <code className="bg-red-100 px-1">NEXT_PUBLIC_HEYGEN_TOKEN</code> в .env.local или настройках Vercel.</p>
    </div>
  );
}

// Изменение в components/InteractiveAvatar.tsx
// Добавь после получения config:

if (!config.token || config.token.trim() === "") {
  window.location.href = "/errors/token";
  return null;
}

// То есть весь useEffect будет выглядеть так:

useEffect(() => {
  const stored = localStorage.getItem("avatarConfig");
  const config: StartAvatarRequest & { token?: string } = stored
    ? { ...JSON.parse(stored), token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "" }
    : {
        token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN || "",
        quality: AvatarQuality.Low,
        avatarName: AVATARS[0].avatar_id,
        knowledgeId: undefined,
        voice: {
          voiceId: "default",
        },
      };

  if (!config.token || config.token.trim() === "") {
    window.location.href = "/errors/token";
    return;
  }

  startAvatar(config);
}, []);
