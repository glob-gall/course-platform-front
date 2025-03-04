import { ReactNode } from "react"

export interface TitleProps {
  children: ReactNode
}

export function Title({children}: TitleProps) {
  return (
    <h1 className="text-2xl font-bold">{children}</h1>
  )
}