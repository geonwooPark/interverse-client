import withCaption from '@hocs/withCaption'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { InputBox } from 'ventileco-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  endIcon?: ReactNode
}

const TextFieldVariants = cva(
  'body1 w-full rounded-md border bg-gray-50 pl-4 text-body2 outline-none',
  {
    variants: {
      size: {
        sm: 'h-[36px]',
        md: 'h-[40px]',
        lg: 'h-[48px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <InputBox
        {...props}
        ref={ref}
        autoComplete="off"
        className={cn(TextFieldVariants({ size }), className)}
        inputClassName="placeholder:text-gray-300 placeholder:text-body2"
      />
    )
  },
)

TextField.displayName = 'TextField'

export default TextField

export const TextFieldWithCaption = withCaption(TextField)
