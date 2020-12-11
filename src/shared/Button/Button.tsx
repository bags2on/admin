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
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

interface BottonStyleTypes {
  withShadow: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 'normal',
    fontSize: '16px',
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
    background: theme.palette.secondary.main,
    color: theme.palette.primary.light,
    '&:hover': {
      opacity: '0.9',
      background: theme.palette.secondary.main
    }
  }
}))

const Button: React.FC<BottonProps> = ({
  loading,
  children,
  darkLoader,
  color = 'main',
  withShadow = true,
  ...otherProps
}: BottonProps) => {
  const classes = useStyles({ withShadow })

  return (
    <MaterialButton className={clsx(classes[color], classes.root)} {...otherProps}>
      {loading ? <Loader dark={darkLoader} /> : <span className={classes.text}>{children}</span>}
    </MaterialButton>
  )
}

export default Button
