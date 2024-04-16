"use client";

import { Button } from "@/components/ui/button";
import { useSessionStorage } from "react-storage-complete";
import { useState, useEffect } from "react";
import { MoveLeft, MoveRight, Repeat2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { shuffle } from "lodash";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function MemorizePage() {
  const router = useRouter();
  const [text, setText] = useSessionStorage<string[][]>(
    "text",
    [],
  ) as unknown as [string[][], (value: string[][][]) => void];
  const [level, setLevel] = useState<number>(1);
  const [hiddenWords, setHiddenWords] = useState<number[][]>([]);

  useEffect(() => {
    const newHiddenWords = text.map((line) => {
      if (level === 1) return [];

      const shuffledLine = shuffle(line.map((_, wordIndex) => wordIndex));
      return shuffledLine.slice(0, level - 1);
    });
    setHiddenWords(newHiddenWords);
  }, [level, text]);

  function revealWord(lineIndex: number, wordIndex: number) {
    // Remove the word index from the hidden words array
    const newHiddenWords = hiddenWords.slice();
    newHiddenWords[lineIndex] = newHiddenWords[lineIndex]!.filter(
      (hiddenWordIndex) => hiddenWordIndex !== wordIndex
    );
    setHiddenWords(newHiddenWords);
  }

  function reshuffleWords() {
    const newHiddenWords = text.map((line, lineIndex) => {
      if (level === 1) return [];

      const shuffledLine = shuffle(line.map((_, wordIndex) => wordIndex));
      return shuffledLine.slice(0, level - 1);
    });
    setHiddenWords(newHiddenWords);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-10 p-4">
      <span className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">level {level}</h1>
        <p className="text-secondary-foreground">{describeLevel(level)}</p>
      </span>
      <ScrollArea className="h-[10rem] w-full w-xl">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {text.map((line, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              {line.map((word, j) => (
                <div key={j} className="flex flex-row items-center gap-1">
                  {hiddenWords[i]?.includes(j) ? (
                    <Button
                      className="text-background hover:text-accent"
                      variant="outline"
                      onClick={() => revealWord(i, j)}
                    >
                      <span>{word}</span>
                    </Button>
                  ) : (
                    <Button variant="secondary">{word}</Button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <footer className="fixed bottom-0 flex flex-row items-center gap-2 rounded-md p-8 xl:p-[5rem] backdrop-blur">
        <Button
          variant="outline"
          size="icon"
          disabled={level === 1}
          onClick={() => setLevel(level - 1)}
        >
          <MoveLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => reshuffleWords()}>
          <Repeat2 className="h-4 w-4" />
        </Button>
        {level === 6 ? (
          <Button onClick={() => router.push("/")}>return to home</Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLevel(level + 1)}
          >
            <MoveRight className="h-4 w-4" />
          </Button>
        )}
      </footer>
    </main>
  );
}

function describeLevel(level: number): string {
  switch (level) {
    case 1:
      return "your text has been split up into lines of five words. after each level, some words will be removed. for this first level, simply read all the text out loud";
    case 2:
      return "words have been removed from each line. click on the empty word to reveal it and check if it was correct. if you make a mistake, click retry and start again";
    case 3:
      return "2 words have now been removed per line. make sure to check you got each word right before you progress and retry if you get one wrong";
    case 4:
      return "it's getting more difficult now. retry the level if it takes more than a few seconds to remember the word until you are confidently able to get all of them";
    case 5:
      return "only one word remains in each line. you should now be very familiar with the text. if you are not, retry the level until you are";
    case 6:
      return "the remaining words have been removed. by the end of this level, you should be able to remember all the words in each line";
    default:
      return "you have completed all the levels. return to the home page to start again";
  }
}
