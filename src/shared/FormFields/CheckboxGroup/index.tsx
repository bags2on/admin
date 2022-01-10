import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from './Checkbox'
import { FieldArray, Field } from 'formik'
import { makeStyles } from '@material-ui/core'

type optionType = {
  value: string
  label: string
}

interface CheckBoxGroupProps {
  name: string
  title: string
  options: Array<optionType>
}

const useStyles = makeStyles(() => ({
  title: {
    padding: '8px 10px'
  },
  collapseList: {
    paddingLeft: 20
  }
}))

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ title, options, name }) => {
  const classes = useStyles()
  const [isCollapsed, setCollapsed] = useState<boolean>(true)

  const handleCollapse = (): void => {
    setCollapsed(!isCollapsed)
  }

  return (
    <div>
      <ListItem button onClick={handleCollapse} className={classes.title}>
        <ListItemText primary={title} />
        {/* {isCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
      </ListItem>
      <FieldArray
        name={name}
        render={({ name }) => (
          <Collapse in={isCollapsed} timeout="auto" unmountOnExit className={classes.collapseList}>
            <FormControl component="fieldset">
              <FormGroup>
                {options.map(({ label, value }) => (
                  <Field
                    key={value}
                    type="checkbox"
                    component={Checkbox}
                    name={name}
                    value={value}
                    Label={{ label }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Collapse>
        )}
      />
    </div>
  )
}

export default CheckBoxGroup
