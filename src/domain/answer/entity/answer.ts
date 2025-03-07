
export type Answer = {
  id: string;
  type: 'TEXT' | 'VIDEO' | 'AUDIO';
  resourceURL: string | null | undefined;
  description: string;
  isCorrect: boolean;
}