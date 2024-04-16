"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { splitSentence } from "@/lib/splitSentence";
import { useSessionStorage } from "react-storage-complete";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [text, setText] = useSessionStorage<string[][]>("text", []);
  const router = useRouter();

  function handleFormEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sentence = (document.getElementById("meemaw") as HTMLTextAreaElement)
      .value;

    if (sentence) {
      setText(splitSentence(sentence));
      router.push("/memorize");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <span className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          memorizer-tool
        </h1>
        <p className="text-secondary-foreground">
          enter text you want to memorize
        </p>
      </span>
      <form
        className="grid min-h-[20rem] w-full max-w-lg gap-2"
        onSubmit={handleFormEvent}
      >
        <Textarea id="meemaw" placeholder="enter text here" />
        <Button>start memorizing!</Button>
      </form>
    </main>
  );
}
