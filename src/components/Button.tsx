import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}

export function Button({ children = '', className, ...rest }: ButtonProps) {
  return (
    <button
      className={
        className +
        ' bg-slate-500 text-slate-200 text-xl p-2 border border-slate-400 w-full h-16'
      }
      {...rest}
    >
      {children}
    </button>
  )
}
