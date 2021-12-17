import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import history from '../../utils/history'
import { makeStyles } from '@material-ui/core'

interface PaginationProps {
  total: number
  currentPage: number
  route: string
}

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  pagingItem: {
    margin: 5,
    display: 'flex',
    fontWeight: 600,
    cursor: 'pointer',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444444',
    borderRadius: 5,
    fontSize: 15,
    outline: 'none',
    width: 35,
    height: 35,
    padding: 0,
    userSelect: 'none',
    transition: 'opacity .3s',
    '&:hover': {
      opacity: '0.6'
    }
  },
  activePage: {
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#696C72',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
  }
}))

const Pagination: React.FC<PaginationProps> = ({ total, currentPage, route }) => {
  const [current, setCurrent] = useState<number>(currentPage > total ? total : currentPage)
  const [items, setItems] = useState<(string | number)[]>([])

  const stageItems: (string | number)[] = []

  const handlePaginationChange = (value: number | string): void => {
    if (typeof value === 'number') {
      setCurrent(value)
      history.push(route + `/${value}`)
    }
  }

  const classes = useStyles()

  const constantSlots = 8

  const isCollapsed = constantSlots <= 6
  const slots = Math.min(constantSlots, total)
  const ellipsisPos: number[] = []
  // let i, showFirst, showLast

  // Center active page in middle of pagination
  let start = current - Math.round(constantSlots / 2) + 1

  // If pagination values exceed the expected range,
  const overflow = start + slots - 1 - total
  if (overflow > 0) start -= overflow
  if (start <= 0) start -= start - 1

  const end = start + slots - 1

  // Check if it should have ellipsis and define sllipsis position
  const hasEllipsisLeft = start > 1
  const hasEllipsisRright = end < total
  if (hasEllipsisLeft) ellipsisPos.push(isCollapsed ? start : start + 1)
  if (hasEllipsisRright) ellipsisPos.push(isCollapsed ? end : end - 1)

  useEffect(() => {
    let i, showFirst, showLast

    for (i = start; i <= end; i++) {
      showFirst = !isCollapsed && i === start && hasEllipsisLeft
      showLast = !isCollapsed && i === end && hasEllipsisRright

      if (showFirst) {
        stageItems.push(1)
      } else if (ellipsisPos.includes(i)) {
        stageItems.push('...')
      } else if (showLast) {
        stageItems.push(total)
      } else {
        stageItems.push(i)
      }
    }
    setItems(stageItems)
  }, [current, total])

  return (
    <section>
      <ul className={classes.pagination}>
        {items.map((page, ind) => {
          return (
            <li
              key={ind}
              className={clsx({
                [classes.pagingItem]: true,
                [classes.activePage]: current === page
              })}
              onClick={(): void => handlePaginationChange(page)}
            >
              {page}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Pagination
