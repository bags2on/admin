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
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  placeholder?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const [field, meta] = useField(props)

  const classes = useStyles()

  return (
    <>
      <TextField
        {...field}
        {...props}
        variant="outlined"
        error={!!meta.error}
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
    </>
  )
}

export default TextInput