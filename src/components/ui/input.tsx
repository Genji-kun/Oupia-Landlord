import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  line?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, line, ...props }, ref) => {
    return (
      <div className='relative'>
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2',
            !line ? 'left-2' : 'left-0'
          )}
        >
          {icon!}
        </div>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-600',
            className,
            icon && 'pl-10',
            icon && line && 'pl-8',
            !line
              ? 'focus-visible:outline-primary-500'
              : 'focus-visible:outline-none'
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
