/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import clsx from 'clsx'
import NavList from './NavList/NavList'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import UserInfo from './UserInfo/UserInfo'
import { useQuery } from '@apollo/client'
import { GET_USER_DATA } from '../../apollo/cache/queries/user'
import { ReactComponent as RightArrowIcon } from '../../asset/svg/right-arrow.svg'
import { ReactComponent as LeftArrowIcon } from '../../asset/svg/left-arrow.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 70,
    position: 'relative',
    flexShrink: 0,
    height: '100%',
    backgroundColor: '#232323',
    overflowX: 'hidden',
    transition: 'all .2s'
  },
  rootExpanded: {
    width: 270
  },
  expandButton: {
    display: 'block',
    margin: '10px 10px 10px auto',
    fill: '#fff',
    '&:hover': {
      background: 'none',
      fill: theme.palette.primary.main
    }
  }
}))

interface userData {
  id: string
  name: string
  picture: string
}

interface userDataQuery {
  userData: userData
}

const SideBar: React.FC = () => {
  const classes = useStyles()
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const { data } = useQuery<userDataQuery>(GET_USER_DATA)

  const handleExpandButtonClick = (): void => {
    setExpanded((prev) => !prev)
  }

  return (
    <aside
      className={clsx({
        [classes.root]: true,
        [classes.rootExpanded]: isExpanded
      })}
    >
      <IconButton disableRipple className={classes.expandButton} onClick={handleExpandButtonClick}>
        <Icon>{isExpanded ? <LeftArrowIcon /> : <RightArrowIcon />}</Icon>
      </IconButton>
      <NavList />
      <UserInfo name={data?.userData.name || ''} picture={data?.userData.picture || ''} />
    </aside>
  )
}

export default SideBar
