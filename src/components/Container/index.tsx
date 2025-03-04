import { ReactNode } from "react"
//bg-secondary
export interface ContainerProps {
  children: ReactNode
}

export function Container({children}: ContainerProps) {
  return (
    <div className="flex w-full my-16 px-4">
      <div className="flex mx-auto w-full max-w-7xl  rounded-md">       
        {children}
      </div>
    </div>
  )
}