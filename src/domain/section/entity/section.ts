
type LectureType = 'AUDIO' | 'VIDEO' | 'OTHER';

export type Section = {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,

  type: LectureType,
  resourceUrl: string,
}