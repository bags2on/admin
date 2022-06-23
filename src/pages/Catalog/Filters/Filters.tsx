import React from 'react'
import Divider from '@material-ui/core/Divider'
import RadioGroup from '../../../shared/FormFields/RadioGroup/RadioGroup'
import CheckBoxGroup from '../../../shared/FormFields/CheckboxGroup'
import PriceRange from '../../../shared/FormFields/PriceRange/PriceRange'
import fieldProps from './data'
import Button from '../../../shared/Button/Button'
import AutoSave from '../../../shared/AutoSave'
import { Formik, Form } from 'formik'
import classes from './styles.module.scss'

type PriceRange = {
  lt: number
  gt: number
}

type InitValues = {
  gender: Array<string>
  availability: Array<string>
  mainTag: string
  priceRange: Array<number>
  category: Array<string>
}

interface FiltersProps {
  formRef: React.RefObject<HTMLFormElement>
  priceRange: number[]
  initValues: InitValues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit(values: any): void
}

const Filters: React.FC<FiltersProps> = ({ priceRange, initValues, formRef, onSubmit }) => {
  const { gender, availability, radioGroup, categories } = fieldProps
  const [minPrice, maxPrice] = priceRange

  const handleSubmit = (): void => {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (values: any) => {
    onSubmit(values)
  }

  return (
    <aside className={classes.root}>
      <Formik
        enableReinitialize
        onReset={(_, { setValues }) => {
          setValues({
            gender: [],
            availability: [],
            mainTag: '',
            priceRange: [],
            category: []
          })
        }}
        onSubmit={handleSubmit}
        initialValues={initValues}
      >
        {({ dirty, resetForm }): React.ReactElement => (
          <Form ref={formRef}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
              <p className={classes.title}>Параметры</p>
              {dirty && (
                <Button onClick={() => resetForm()} className={classes.clearButton} disableShadow>
                  очистить
                </Button>
              )}
            </div>
            <Divider
              classes={{
                root: classes.divider
              }}
            />
            <AutoSave onSave={handleSave} />
            <CheckBoxGroup title="Тип" name="gender" options={gender.options} />
            <CheckBoxGroup name="availability" title="Наличие" options={availability.options} />
            <div className={classes.generalWrapper}>
              <RadioGroup name="mainTag" size="medium" options={radioGroup.options} />
            </div>
            <PriceRange name="priceRange" min={minPrice} max={maxPrice} title="Цена" />
            <CheckBoxGroup title="Категория" name="category" options={categories.options} />
          </Form>
        )}
      </Formik>
    </aside>
  )
}

export default Filters
