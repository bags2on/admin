import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import history from '../../utils/history'

interface PaginationProps {
  total: number
  currentPage: number
  route: string
}

const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

interface PaginationItemProps {
  active: boolean
}

const PaginationItem = styled.li<PaginationItemProps>`
  display: flex;
  margin: 5px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #444444;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
  width: 35px;
  height: 35px;
  padding: 0;
  user-select: none;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.6;
  }
  ${({ active }) =>
    active
      ? css`
          background-color: #696c72; // 'light' ? '#fff' : '#696C72',
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        `
      : undefined}
`

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
      <PaginationList>
        {items.map((page, ind) => {
          return (
            <PaginationItem
              key={ind}
              active={current === page}
              onClick={(): void => handlePaginationChange(page)}
            >
              {page}
            </PaginationItem>
          )
        })}
      </PaginationList>
    </section>
  )
}

export default Pagination
