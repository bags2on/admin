import React, { useState, useLayoutEffect } from 'react'
import clsx from 'clsx'
import SvgIcon from '@material-ui/core/SvgIcon'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import { ReactComponent as ExpandMoreIcon } from '../../../asset/svg/right-arrow.svg'
import { ReactComponent as ExpandLessIcon } from '../../../asset/svg/right-arrow.svg'
import Button from '../../../shared/Button/Button'
import { useFormikContext } from 'formik'
import { Range } from 'rc-slider'
import { makeStyles } from '@material-ui/core'

import 'rc-slider/assets/index.css'
import './PriceRange.scss'

interface PriceRangeProps {
  title: string
  name: string
  min: number
  max: number
  step?: number
}

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    padding: '8px 10px'
  },
  collapseBox: {
    width: '100%',
    padding: '20px 15px 35px 13px'
  },
  controlsBox: {
    marginBottom: 20
  },
  input: {
    border: '1px solid',
    color: theme.palette.type === 'light' ? '#343434' : '#fff',
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#3c4144',
    borderColor: theme.palette.type === 'light' ? '#c4c4c4' : '#3c4144'
  },
  submitButton: {
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#2bab2b',
    color: theme.palette.type === 'light' ? '#343434' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.type === 'dark' ? 'transparent' : '#c0c0c0',
    '&:hover': {
      backgroundColor: theme.palette.type === 'dark' ? '#32cd32' : '#efefef'
    }
  }
}))

interface FormFields {
  priceRange: Array<number>
}

const PriceRange: React.FC<PriceRangeProps> = ({ title, name, min, max, step = 1 }) => {
  const classes = useStyles()
  const { values, setFieldValue } = useFormikContext<FormFields>()

  const [minPrice, maxPrice] = values.priceRange || [0, 0]
  const [isCollapsed, setCollapsed] = useState<boolean>(true)

  const [minInputValue, setMinInputValue] = useState<number>(minPrice)
  const [maxInputValue, setMaxInputValue] = useState<number>(maxPrice)

  const [sliderMin, setSliderMin] = useState<number>(minInputValue)
  const [sliderMax, setSliderMax] = useState<number>(maxInputValue)

  useLayoutEffect(() => {
    setMinInputValue(minPrice)
    setMaxInputValue(maxPrice)

    setSliderMin(minPrice)
    setSliderMax(maxPrice)
  }, [minPrice, maxPrice])

  const handleCollapse = (): void => {
    setCollapsed(!isCollapsed)
  }

  const onSliderChange = (values: number[]): void => {
    const [min, max] = values

    setMinInputValue(min)
    setMaxInputValue(max)

    setSliderMin(min)
    setSliderMax(max)
  }

  const onMinChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const min = +event.target.value
    setMinInputValue(min)
  }

  const onMaxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const max = +event.target.value
    setMaxInputValue(max)
  }

  const handlePriceSubmit = (): void => {
    setSliderMin(minInputValue)
    setSliderMax(maxInputValue)

    setFieldValue(name, [minInputValue, maxInputValue])
  }

  const marks = {
    [min]: min,
    [max]: max
  }

  return (
    <div>
      <ListItem button onClick={handleCollapse} className={classes.title}>
        <ListItemText primary={title} />
        <SvgIcon component="span">{isCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}</SvgIcon>
      </ListItem>
      <Collapse in={isCollapsed} timeout="auto" unmountOnExit className={classes.collapseBox}>
        <div className={classes.controlsBox}>
          <input
            type="number"
            value={minInputValue}
            onChange={onMinChange}
            className={clsx(classes.input, 'price-input')}
          />
          <input
            type="number"
            value={maxInputValue}
            onChange={onMaxChange}
            className={clsx(classes.input, 'price-input')}
          />
          <Button
            disableShadow
            className={clsx(classes.submitButton, 'price-submit')}
            onClick={handlePriceSubmit}
          >
            ok
          </Button>
        </div>
        <Range
          min={min}
          max={max}
          step={step}
          value={[sliderMin, sliderMax]}
          onChange={onSliderChange}
          marks={marks}
        />
      </Collapse>
    </div>
  )
}

export default PriceRange
