
export enum LectureType {
  Audio='AUDIO',
  Video='VIDEO',
  Other='OTHER',
}

export type Lecture = {
  id: string,
  title: string,
  description: string,
  type: LectureType,
  resourceUrl: string,
  createdAt: string,
  updatedAt: string,
}
