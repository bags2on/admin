import React from 'react'
import { FieldProps } from 'formik'
import FormControlLabel, {
  FormControlLabelProps as MuiFormControlLabelProps
} from '@material-ui/core/FormControlLabel'
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  checked: {
    color:
      (theme.palette.type === 'light' ? '#343434' : theme.palette.secondary.main) + '!important'
  }
}))

interface CheckboxProps
  extends FieldProps,
    Omit<
      MuiCheckboxProps,
      | 'name'
      | 'value'
      | 'error'
      | 'form'
      | 'checked'
      | 'defaultChecked'
      // Excluded for conflict with Field type
      | 'type'
    > {
  type?: string
}

function fieldToCheckbox({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  type,
  onBlur,
  ...props
}: CheckboxProps): MuiCheckboxProps {
  const indeterminate = !Array.isArray(field.value) && field.value == null

  return {
    disabled: disabled ?? isSubmitting,
    indeterminate,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name)
      },
    ...field,
    ...props
  }
}

interface ComponentProps extends FieldProps, CheckboxProps {
  Label: Omit<MuiFormControlLabelProps, 'checked' | 'name' | 'value' | 'control'>
}

const Checkbox: React.FC<ComponentProps> = ({ Label, ...restProps }) => {
  const classes = useStyles()
  return (
    <FormControlLabel
      {...Label}
      control={
        <MuiCheckbox
          classes={{
            checked: classes.checked
          }}
          {...fieldToCheckbox(restProps)}
        />
      }
    />
  )
}

export default Checkbox
