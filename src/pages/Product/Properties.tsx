import React from 'react'
import Fade from '@material-ui/core/Fade'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import { useField } from 'formik'
import { ReactComponent as MaterialIcon } from '../../asset/svg/icons/product-material.svg'
import { ReactComponent as ColorIcon } from '../../asset/svg/icons/product-color.svg'
import { ReactComponent as GenderIcon } from '../../asset/svg/icons/product-gender.svg'
import { ReactComponent as CategoryIcon } from '../../asset/svg/icons/product-category.svg'
import { materialOptions, genderOptions, categoryOptions } from './fieldsOptions'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    margin: 0
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 10px 15px 15px',
    margin: '10px 0px 5px 0px',
    listStyle: 'none',
    borderRadius: 10,
    boxShadow: '0px 1px 9px -1px rgba(0, 0, 0, 0.1)',
    fontWeight: 500,
    backgroundColor: '#363636'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexBasis: '25%',
    fontSize: 15,
    padding: '0 10px',
    marginBottom: 10
  },
  itemIcon: {
    width: 45,
    marginRight: 10,
    paddingTop: 22,
    '& svg': {
      fill: '#c0c0c0'
    }
  },
  itemInfo: {
    width: '100%',
    '& p': {
      fontSize: 14,
      color: '#939191',
      margin: 0,
      marginBottom: 3,
      userSelect: 'none'
    },
    '& span': {
      fontSize: 16
    }
  },
  errorMessage: {
    margin: 0,
    fontSize: 16,
    height: 23,
    color: '#ff182e',
    paddingLeft: 20
  }
}))

const Properties: React.FC = () => {
  const classes = useStyles()

  const [_a, categoryMeta] = useField('category')
  const [_b, materialMeta] = useField('material')
  const [_c, colorMeta] = useField('color')
  const [_d, genderMeta] = useField('gender')

  const validationError =
    (categoryMeta.touched && categoryMeta.error) ||
    (materialMeta.touched && materialMeta.error) ||
    (colorMeta.touched && colorMeta.error) ||
    (genderMeta.touched && genderMeta.error)

  return (
    <div>
      <p className={classes.title}>Свойства:</p>
      <ul className={classes.list}>
        <li className={classes.item}>
          <div className={classes.itemIcon}>
            <CategoryIcon />
          </div>
          <div className={classes.itemInfo}>
            <p>Категория</p>
            <TextInput
              select
              fullWidth
              hideErrorMessage
              hiddenLabel
              name="category"
              options={categoryOptions}
            />
          </div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemIcon}>
            <MaterialIcon />
          </div>
          <div className={classes.itemInfo}>
            <p>Материал</p>
            <TextInput
              select
              fullWidth
              hideErrorMessage
              hiddenLabel
              name="material"
              options={materialOptions}
            />
          </div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemIcon}>
            <ColorIcon />
          </div>
          <div className={classes.itemInfo}>
            <p>Цвет</p>
            <TextInput fullWidth hideErrorMessage hiddenLabel name="color" />
          </div>
        </li>
        <li className={classes.item}>
          <div className={classes.itemIcon}>
            <GenderIcon />
          </div>
          <div className={classes.itemInfo}>
            <p>Гендер</p>
            <TextInput
              select
              fullWidth
              hideErrorMessage
              hiddenLabel
              name="gender"
              options={genderOptions}
            />
          </div>
        </li>
      </ul>
      <Fade in={!!validationError}>
        <p className={classes.errorMessage}>{validationError}</p>
      </Fade>
    </div>
  )
}

export default Properties
