
export type Answer = {
  id: string;
  type: 'TEXT' | 'VIDEO' | 'AUDIO' | 'IMAGE' |  'OTHER';
  resourceURL: string | null | undefined;
  description: string;
  isCorrect: boolean;
}