import React from 'react'
import Radio from '@material-ui/core/Radio'
import MaterialRadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  checked: {
    color:
      (theme.palette.type === 'light' ? '#343434' : theme.palette.secondary.main) + '!important'
  }
}))

type option = {
  value: string
  label: string
  disabled: boolean
}

interface RadioGroup {
  name: string
  size: 'medium' | 'small'
  options: option[]
}

const RadioGroup: React.FC<RadioGroup> = ({ size, options, ...restProps }) => {
  const classes = useStyles()
  const [field] = useField(restProps)

  return (
    <MaterialRadioGroup {...field} {...restProps}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          control={
            <Radio
              size={size}
              classes={{
                checked: classes.checked
              }}
            />
          }
        />
      ))}
    </MaterialRadioGroup>
  )
}

export default RadioGroup
