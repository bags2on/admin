import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#3c4144',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;',
    color: theme.palette.type === 'light' ? '#3c4144' : '#fff',
    '& .MuiFilledInput-input': {
      // padding: '16px ​14px',
      fontWeight: 500,
      '&[type=number]': {
        '-moz-appearance': 'textfield'
      },
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      }
    }
  },

  message: {
    height: 24,
    fontSize: 14,
    color: '#ff182e',
    paddingLeft: 10,
    opacity: 0,
    transition: 'all 0.33s linear'
  }
}))

interface TextInputProps {
  name: string
  type?: string
  rows?: number
  label?: string
  disabled?: boolean
  multiline?: boolean
  maxLength?: number
  fullWidth?: boolean
  placeholder?: string
  autoComplete?: string
  hiddenLabel?: boolean
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const TextInput: React.FC<TextInputProps> = ({
  autoComplete = 'off',
  maxLength = 50,
  ...restProps
}) => {
  const [field, meta] = useField(restProps)

  const classes = useStyles()

  return (
    <div>
      <TextField
        {...field}
        {...restProps}
        variant="filled"
        autoComplete={autoComplete}
        error={meta.touched && !!meta.error}
        InputProps={{
          classes: {
            root: classes.root
          }
        }}
        inputProps={{
          maxLength
        }}
      />
      <Fade in={meta.touched && !!meta.error}>
        <Typography component="p" className={classes.message}>
          {meta.touched && meta.error}
        </Typography>
      </Fade>
    </div>
  )
}

export default TextInput
