import React from 'react'
import clsx from 'clsx'
import FormControl from '@material-ui/core/FormControl'
import Button from '../../shared/Button/Button'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import EditControls from './EditControls/EditControls'
import CheckBox from '../../shared/FormFields/Checkbox/Checkbox'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { CategoryType, Gender, MainTag } from '../../types'
import { useFormikContext } from 'formik'
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
}

type optionType = {
  label: string
  value: string
}

const MainInputs: React.FC<MainInputsProps> = ({
  productId,
  isEditMode,
  isHidden,
  withDiscount,
  onDiscountCheck
}) => {
  const classes = useStyles()

  const { values, isValid, setFieldValue } = useFormikContext<FormFields>()

  const getCategoryOptions = (): optionType[] => {
    const labels: { [name: string]: string } = {
      Bag: 'Сумка',
      Wallet: 'Кошелек',
      Backpack: 'Рюкзак',
      Suitcase: 'Чемодан',
      Other: 'Другое'
    }

    return Object.keys(CategoryType).map((category) => ({
      label: labels[category],
      value: category.toUpperCase()
    }))
  }

  const getGenderOptions = (): optionType[] => {
    const labels: { [name: string]: string } = {
      Female: 'Женский',
      Male: 'Мужской',
      Unisex: 'Уни-секс'
    }

    return Object.keys(Gender).map((gender) => ({
      label: labels[gender],
      value: gender.toUpperCase()
    }))
  }

  const getMainTagOprtions = (): optionType[] => {
    const labels: { [name: string]: string } = {
      Stock: 'Акция',
      New: 'Новинка',
      Top: 'Топ',
      Regular: 'Обычный'
    }

    return Object.keys(MainTag).map((tag) => ({
      label: labels[tag],
      value: tag.toUpperCase()
    }))
  }

  return (
    <div>
      <div className={classes.container}>
        <FormControl className={clsx(classes.formField)}>
          <CheckBox name="instock" label="В наличии" disableMessage />
        </FormControl>
        {!isEditMode && <EditControls id={productId} isProductHidden={isHidden} />}
      </div>
      <FormControl className={clsx(classes.formField)}>
        <TextInput fullWidth label="Заголовок" name="title" />
      </FormControl>
      <FormControl className={clsx(classes.formField)}>
        <div className={classes.flatFormField}>
          <p>Количество шт:</p>
          <TextInput hiddenLabel name="amount" type="number" />
        </div>
      </FormControl>
      <FormControl className={classes.formField}>
        <div className={classes.flatFormField}>
          <p>Цена (грн.)</p>
          <TextInput hiddenLabel name="basePrice" type="number" />
        </div>
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
              label="Акционная цена (грн.)"
              name="currentPrice"
              type="number"
            />
          </FormControl>
        )}
      </div>
      <FormControl className={clsx(classes.formField)}>
        <div className={classes.genderField}>
          <TextInput select label="Гендер" name="gender" fullWidth options={getGenderOptions()} />
        </div>
      </FormControl>
      <FormControl className={clsx(classes.formField)}>
        <div className={classes.flatFormField}>
          <p>Главный тэг:</p>
          <TextInput fullWidth select hiddenLabel name="mainTag" options={getMainTagOprtions()} />
        </div>
      </FormControl>
      <FormControl className={clsx(classes.formField)}>
        <div className={classes.genderField}>
          <TextInput
            select
            label="Категория"
            name="category"
            fullWidth
            options={getCategoryOptions()}
          />
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
        disabled={!isValid}
        className={classes.submitButton}
      >
        {isEditMode ? 'создать' : 'сохранить'}
      </Button>
    </div>
  )
}

export default MainInputs
