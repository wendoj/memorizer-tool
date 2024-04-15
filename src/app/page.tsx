import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <span className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold">memorizer-tool</h1>
        <p className="text-secondary-foreground">
          enter text you want to memorize
        </p>
      </span>
      <div className="grid w-full max-w-lg min-h-[15rem] gap-2">
        <Textarea placeholder="enter text here" />
        <Button>start memorizing!</Button>
      </div>
    </main>
  );
}
