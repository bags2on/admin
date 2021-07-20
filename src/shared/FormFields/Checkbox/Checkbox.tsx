import React from 'react'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Checkbox as MaterialCheckBox } from '@material-ui/core'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

interface CheckBoxProps {
  name: string
  label: string
  disableMessage?: boolean
}

const useStyles = makeStyles(() => ({
  message: {
    height: 24,
    fontSize: 14,
    color: '#ff182e',
    paddingLeft: 10,
    opacity: 0,
    transition: 'all 0.33s linear'
  }
}))

const CheckBox: React.FC<CheckBoxProps> = ({ label, disableMessage = false, ...restProps }) => {
  const classes = useStyles()
  const [field, meta] = useField(restProps)

  return (
    <div>
      <FormControlLabel
        label={label}
        control={<MaterialCheckBox {...field} {...restProps} checked={field.value} />}
      />
      {!disableMessage && (
        <Fade in={meta.touched && !!meta.error}>
          <Typography component="p" className={classes.message}>
            {meta.touched && meta.error}
          </Typography>
        </Fade>
      )}
    </div>
  )
}

export default CheckBox
