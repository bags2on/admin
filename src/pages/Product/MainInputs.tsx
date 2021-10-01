import React from 'react'
import clsx from 'clsx'
import Properties from './Properties'
import FormControl from '@material-ui/core/FormControl'
import Button from '../../shared/Button/Button'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import EditControls from './EditControls/EditControls'
import CheckBox from '../../shared/FormFields/Checkbox/Checkbox'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useFormikContext } from 'formik'
import { mainTagOptions } from './fieldsOptions'
import { makeStyles } from '@material-ui/core/styles'

interface MainInputsProps {
  productId: string
  isEditMode: boolean
  isHidden: boolean
  withDiscount: boolean
  onDiscountCheck(check: boolean): void
}

const useStyles = makeStyles((theme) => ({
  root: {},
  mainWrapper: {
    padding: '21px 30px 0 30px'
  },
  editPlug: {
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#343434',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  titleGroup: {
    display: 'flex'
  },
  priceGroup: {
    display: 'flex'
  },
  formField: {
    maxWidth: 500,
    display: 'block'
  },
  flatFormField: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      flexBasis: '35%',
      fontSize: 18,
      padding: '0 0 24px 0'
    }
  },
  titleField: {
    flexBasis: '70%',
    marginRight: 20
  },
  priceField: {
    marginRight: 20
  },
  genderField: {
    maxWidth: 300
  },
  categoryField: {
    maxWidth: 300
  },
  discountWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  discountCheckbox: {
    paddingBottom: 24
  },
  submitButton: {
    width: 200,
    padding: '15px 0'
  }
}))

interface FormFields {
  basePrice: string
  category: string
  material: string
  color: string
  gender: string
}

const MainInputs: React.FC<MainInputsProps> = ({
  productId,
  isEditMode,
  isHidden,
  withDiscount,
  onDiscountCheck
}) => {
  const classes = useStyles()

  const { values, setFieldValue } = useFormikContext<FormFields>()

  return (
    <div>
      <div className={classes.container}>
        <FormControl className={clsx(classes.formField)}>
          <CheckBox name="instock" label="В наличии" disableMessage />
        </FormControl>
        {!isEditMode && <EditControls id={productId} isProductHidden={isHidden} />}
      </div>
      <div className={classes.titleGroup}>
        <FormControl className={clsx(classes.formField, classes.titleField)}>
          <TextInput fullWidth label="Наименование" name="title" />
        </FormControl>
        <FormControl className={clsx(classes.formField)}>
          <TextInput label="Количество" name="amount" type="number" />
        </FormControl>
      </div>
      <div className={classes.priceGroup}>
        <FormControl className={clsx(classes.formField, classes.priceField)}>
          <TextInput label="Цена" name="basePrice" type="number" />
        </FormControl>
        <div className={classes.discountWrapper}>
          <FormControlLabel
            className={classes.discountCheckbox}
            label={withDiscount ? 'Убрать акцию' : 'Добавить акцию'}
            control={
              <Checkbox
                checked={withDiscount}
                onChange={(e) => {
                  setFieldValue('currentPrice', '')
                  onDiscountCheck(e.target.checked)
                }}
              />
            }
          />
          {withDiscount && (
            <FormControl className={clsx(classes.formField)}>
              <TextInput
                disabled={!!!values.basePrice}
                label="Акционная цена"
                name="currentPrice"
                type="number"
              />
            </FormControl>
          )}
        </div>
      </div>
      {/*  */}
      <Properties />
      {/*  */}
      <FormControl className={clsx(classes.formField)}>
        <div className={classes.flatFormField}>
          <p>Главный тэг:</p>
          <TextInput fullWidth select hiddenLabel name="mainTag" options={mainTagOptions} />
        </div>
      </FormControl>
      <FormControl className={clsx(classes.formField)}>
        <TextInput label="Описание" name="description" fullWidth multiline rows={5} />
      </FormControl>
      <Button
        type="submit"
        disableShadow
        color="secondary"
        // disabled={!isPhotoExist || !isPhotoExist || !isValid}
        className={classes.submitButton}
      >
        {isEditMode ? 'создать' : 'сохранить'}
      </Button>
    </div>
  )
}

export default MainInputs
