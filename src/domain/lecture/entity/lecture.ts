
type LectureType = 'AUDIO' | 'VIDEO' | 'OTHER'

export type Lecture = {
  id: string,
  title: string,
  description: string,
  type: LectureType,
  resourceUrl: string,
  createdAt: string,
  updatedAt: string,
}
