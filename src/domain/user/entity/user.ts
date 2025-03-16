
export type UserRole = 'STUDENT' | 'ADMIN' | 'COURSE_OWNER'
export type User = {
  id: string,
  name: string,
  email: string,
  role: UserRole,
  createdAt: string,
  updatedAt: string,
}
