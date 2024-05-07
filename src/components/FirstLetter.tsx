import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MoveLeft, MoveRight, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FirstLetterProps {
  text: string[][];
}

export const FirstLetter = ({ text }: FirstLetterProps) => {
  const [level, setLevel] = useState(1);
  const router = useRouter();
  const [hiddenWords, setHiddenWords] = useState<number[][]>([]);

  useEffect(() => {
    if (level === 2) {
      const newHiddenWords = text.map((line) =>
        line.map((_, wordIndex) => wordIndex),
      );
      setHiddenWords(newHiddenWords);
    } else {
      setHiddenWords([]);
    }
  }, [text, level]);

  function revealWord(lineIndex: number, wordIndex: number) {
    // Remove the word index from the hidden words array
    const newHiddenWords = hiddenWords.slice();
    newHiddenWords[lineIndex] = newHiddenWords[lineIndex]!.filter(
      (hiddenWordIndex) => hiddenWordIndex !== wordIndex,
    );
    setHiddenWords(newHiddenWords);
  }

  const handleLevelChange = (newLevel: number) => {
    if (newLevel >= 1 && newLevel <= 2) {
      setLevel(newLevel);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-10 p-4">
      <span className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">level {level}</h1>
        <p className="text-secondary-foreground">
          Make sure to familiarise yourself with the first letters of each word
        </p>
      </span>
      <ScrollArea className="w-xl h-[17rem] w-full xl:h-[20rem] 2xl:h-[25rem]">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {text.map((line, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              {line.map((word, j) => (
                <div key={j} className="flex flex-row items-center gap-1">
                  <Button variant="secondary" onClick={() => revealWord(i, j)}>
                    {level === 1 || !hiddenWords[i]?.includes(j) ? (
                      word
                    ) : (
                      <span className="flex flex-row items-center space-x-0.5 text-center">
                        {word[0]}
                        <p className="text-transparent">{word.slice(1)}</p>
                      </span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <footer className="fixed bottom-0 flex flex-row items-center gap-2 rounded-md rounded-md p-8 backdrop-blur lg:p-12">
        <Button
          variant="outline"
          size="icon"
          disabled={level === 1}
          onClick={() => setLevel(1)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={level === 1}
          onClick={() => setLevel(level - 1)}
        >
          <MoveLeft className="h-4 w-4" />
        </Button>
        {level === 2 ? (
          <Button onClick={() => router.push("/")}>return to home</Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleLevelChange(level === 1 ? 2 : 1)}
          >
            <MoveRight className="h-4 w-4" />
          </Button>
        )}
      </footer>
    </main>
  );
};
