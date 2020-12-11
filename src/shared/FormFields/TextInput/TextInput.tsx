import React from 'react'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;',
    color: '#343434',
    '& .MuiOutlinedInput-input': {
      fontWeight: 400
    }
  },
  box: {
    height: 24
  },
  message: {
    height: 24,
    fontSize: 14,
    color: '#ff182e',
    paddingLeft: 10,
    opacity: 0,
    transition: 'all 0.33s linear'
  },
  notchedOutline: {
    borderWidth: '1px'
  }
}))

interface TextInputProps {
  name: string
  type?: string
  rows?: number
  label?: string
  disabled?: boolean
  multiline?: boolean
  fullWidth?: boolean
  placeholder?: string
  autoComplete?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const TextInput: React.FC<TextInputProps> = ({ autoComplete = 'off', ...restProps }) => {
  const [field, meta] = useField(restProps)

  const classes = useStyles()

  return (
    <div>
      <TextField
        {...field}
        {...restProps}
        variant="outlined"
        autoComplete={autoComplete}
        error={meta.touched && !!meta.error}
        InputProps={{
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline
          }
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
