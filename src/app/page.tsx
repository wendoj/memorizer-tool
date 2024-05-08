"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { splitSentence } from "@/lib/splitSentence";
import { useSessionStorage } from "react-storage-complete";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Mode = "word" | "letter";

export default function HomePage() {
  const [text, setText] = useSessionStorage<string[][]>("text", []);
  const [mode, setMode] = useSessionStorage<Mode>("mode", "word");
  const router = useRouter();

  function handleFormEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sentence = (
      document.getElementById("textarea") as HTMLTextAreaElement
    ).value;

    if (sentence) {
      setText(splitSentence(sentence));
      router.push("/memorize");
    }
  }

  function handleModeChange(newMode: Mode) {
    setMode(newMode);
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
        className="flex w-full max-w-lg flex-col gap-2"
        onSubmit={handleFormEvent}
      >
        <Textarea
          className="min-h-[14rem]"
          id="textarea"
          placeholder="enter text here"
        />
        <div className="flex flex-row items-center">
          <Button type="submit" className="mr-1 w-full">
            memorize text
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button variant="secondary" type="button">
                choose mode
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>choose a mode</DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex flex-row gap-1">
                <DialogClose asChild>
                  <Button onClick={() => handleModeChange("word")}>
                    remove a word every level
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => handleModeChange("letter")}>
                    show only the first letter of every word
                  </Button>
                </DialogClose>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </main>
  );
}
