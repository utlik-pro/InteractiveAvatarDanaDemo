"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_HEYGEN_TOKEN;
    if (!token || token.trim() === "") {
      router.push("/errors/token");
    }
  }, [router]);

  return null;
}
