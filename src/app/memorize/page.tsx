import { Button } from "@/components/ui/button";
import { splitSentence } from "@/lib/splitSentence";
import { useState } from "react";

export default function MemorizePage() {
  
    return (
    <main className="flex py-xl flex-col items-center justify-center gap-4">
      <span className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold">level 1</h1>
        <p className="text-secondary-foreground">
          your text has been split up into lines of five words. after each
          level, some words will be removed. for this first level, simply read
          all the text out loud
        </p>
      </span>
      <div className="grid min-h-[15rem] w-full max-w-lg gap-2">
        <Button>start memorizing!</Button>
      </div>
    </main>
  );
}
