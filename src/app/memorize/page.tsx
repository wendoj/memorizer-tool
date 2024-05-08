"use client";

import { useSessionStorage } from "react-storage-complete";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MemorizeComponent } from "@/components/MemorizeWord";
import { FirstLetter } from "@/components/FirstLetter";
import { LoaderCircle } from "lucide-react";

type Mode = "word" | "letter" | "";

export default function MemorizePage() {
  const router = useRouter();
  const [text, setText] = useSessionStorage<string[][]>(
    "text",
    [],
  ) as unknown as [string[][], (value: string[][][]) => void];
  const [mode, setMode] = useSessionStorage<Mode>("mode", "");

  useEffect(() => {
    if (text.length === 0 || mode === "") {
      router.push("/");
    }
  }, [router, text]);

  const ComponentToRender = mode === "word" ? MemorizeComponent : FirstLetter;

  if (mode === "") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin" />
      </main>
    );
  }

  return <ComponentToRender text={text} />;
}
