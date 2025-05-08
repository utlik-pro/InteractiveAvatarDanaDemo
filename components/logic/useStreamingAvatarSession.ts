import { createStreamingAvatarSession } from "@heygen/streaming-avatar";
import { useRef } from "react";

let globalSession: any = null;

export function useStreamingAvatarSession() {
  const sessionRef = useRef<any>(null);

  const startAvatar = async (config) => {
    if (globalSession) {
      console.warn("Avatar session already running.");
      return;
    }

    try {
      const session = await createStreamingAvatarSession({
        token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN!,
        config,
        onMessage: (msg) => console.log("Message:", msg),
        onStateChange: (state) => console.log("State:", state),
      });

      sessionRef.current = session;
      globalSession = session;

      await session.start();
    } catch (err) {
      console.error("Failed to start avatar:", err);
    }
  };

  const stopAvatar = () => {
    if (sessionRef.current) {
      sessionRef.current.stop();
      globalSession = null;
    }
  };

  return { startAvatar, stopAvatar };
}
