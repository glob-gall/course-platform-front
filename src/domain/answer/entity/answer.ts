
export type Answer = {
  id: string;
  audioURL: string | null | undefined;
  videoURL: string | null | undefined;
  description: string;
  isCorrect: boolean;
}