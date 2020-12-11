import React from 'react'
import clsx from 'clsx'
import { Button as MaterialButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Loader from '../Loader/Loader'

interface BottonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  color?: 'main' | 'secondary'
  children: React.ReactNode
  component?: React.ReactNode
  startIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  withShadow?: boolean
  darkLoader?: boolean
  className?: string
  userBgColor?: string
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

interface BottonStyleTypes {
  userBgColor?: string
  withShadow: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 'normal',
    fontSize: 16,
    padding: '10px',
    fontWeight: 500,
    color: '#fff',
    borderRadius: '6px',
    boxShadow: (props: BottonStyleTypes) => (props.withShadow ? '0px 8px 17px rgba(0, 0, 0, .3)' : 'none')
  },
  text: {
    lineHeight: '24px'
  },
  main: {
    background: '#363636',
    '&:hover': {
      background: '#323232'
    }
  },
  secondary: {
    background: (props: BottonStyleTypes) => (props.userBgColor ? props.userBgColor : theme.palette.secondary.main),
    color: theme.palette.primary.light,
    '&:hover': {
      opacity: '0.9',
      background: (props: BottonStyleTypes) => (props.userBgColor ? props.userBgColor : theme.palette.secondary.main)
    },
    '&:disabled': {
      pointerEvents: 'initial',
      cursor: 'not-allowed',
      background: '#e8e8e8',
      '&:hover': {
        background: '#e8e8e8'
      }
    }
  }
}))

const Button: React.FC<BottonProps> = ({
  loading,
  children,
  darkLoader,
  color = 'main',
  withShadow = true,
  className,
  userBgColor,
  ...otherProps
}: BottonProps) => {
  const classes = useStyles({ withShadow, userBgColor })

  return (
    <MaterialButton className={clsx(classes[color], classes.root, className)} {...otherProps}>
      {loading ? <Loader dark={darkLoader} /> : <span className={classes.text}>{children}</span>}
    </MaterialButton>
  )
}

export default Button
