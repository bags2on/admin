import React from 'react'
import HideProduct from './HideProduct/HideProduct'
import DeleteProduct from './DeleteProduct/DeleteProduct'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: '#4a4a4a',
    marginLeft: 'auto',
    '& li': {
      border: '1px solid #343434'
    }
  }
}))

interface EditControlsProps {
  id: string
  isProductHidden: boolean
}

const EditControls: React.FC<EditControlsProps> = ({ id, isProductHidden }) => {
  const classes = useStyles()

  return (
    <ul className={classes.root}>
      <li>
        <HideProduct id={id} productHiddenStatus={isProductHidden} />
      </li>
      <li>
        <DeleteProduct id={id} />
      </li>
    </ul>
  )
}

export default EditControls
