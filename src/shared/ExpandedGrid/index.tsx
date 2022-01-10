import React, { ElementType } from 'react'
import clsx from 'clsx'
import Grid, { GridSize } from '@material-ui/core/Grid'

interface ExpandedGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ElementType<any>
  className?: string
  item?: boolean
  container?: boolean
  xs?: boolean | GridSize
  md?: boolean | GridSize
  laptop?: boolean | GridSize
  xl?: boolean | GridSize
  desktop?: boolean | GridSize
}

const ExpandedGrid: React.FC<ExpandedGridProps> = ({ className, laptop, desktop, ...other }) => {
  const classes = clsx({
    [`MuiGrid-grid-desktop-${desktop}`]: Boolean(desktop),
    [`MuiGrid-grid-laptop-${laptop}`]: Boolean(laptop)
  })
  return <Grid className={clsx(className, classes)} {...other} />
}

export default ExpandedGrid
