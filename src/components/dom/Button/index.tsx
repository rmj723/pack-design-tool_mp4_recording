import { forwardRef } from 'react'
import Link from 'next/link'
import s from './Button.module.scss'

interface ButtonProps {
  className?: string
  text: string
  href?: string
  flicker?: boolean
  onClick?: () => void
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, text, onClick, href, flicker }, ref) => {
  return (
    <>
      {href ? (
        <Link href={href} target={'_blank'} className={`${s.button} ${className} ${flicker ? s.flicker : ''}`}>
          <span className='button-text'>{text}</span>
          <svg id='Layer_2' className='button-frame' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 377.96 56.96'>
            <g id='Layer_1-2'>
              <path d='M17.97 56.96 0 56.96 9.43 47.79 10.31 48.68 3.08 55.71 17.97 55.71 17.97 56.96z' />
              <path d='M50.63 9.49 49.75 8.61 58.27 0 66.5 0 66.5 1.25 58.79 1.25 50.63 9.49z' />
              <path d='M377.96 56.96 359.99 56.96 359.99 55.71 374.88 55.71 367.66 48.68 368.53 47.79 377.96 56.96z' />
              <path d='M327.33 9.49 319.17 1.25 311.47 1.25 311.47 0 319.7 0 328.22 8.61 327.33 9.49z' />
            </g>
          </svg>
        </Link>
      ) : (
        <button onClick={onClick} ref={ref} className={`${s.button} ${className} ${flicker ? s.flicker : ''}`}>
          <span className='button-text'>{text}</span>
          <svg className='button-frame' id='Layer_2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 377.96 56.96'>
            <g id='Layer_1-2'>
              <path d='M17.97 56.96 0 56.96 9.43 47.79 10.31 48.68 3.08 55.71 17.97 55.71 17.97 56.96z' />
              <path d='M50.63 9.49 49.75 8.61 58.27 0 66.5 0 66.5 1.25 58.79 1.25 50.63 9.49z' />
              <path d='M377.96 56.96 359.99 56.96 359.99 55.71 374.88 55.71 367.66 48.68 368.53 47.79 377.96 56.96z' />
              <path d='M327.33 9.49 319.17 1.25 311.47 1.25 311.47 0 319.7 0 328.22 8.61 327.33 9.49z' />
            </g>
          </svg>
        </button>
      )}
    </>
  )
})

export default Button
