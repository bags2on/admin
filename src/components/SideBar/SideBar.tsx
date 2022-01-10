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
    position: 'fixed',
    height: '100%',
    backgroundColor: '#232323',
    overflowX: 'hidden',
    transition: 'all .2s',
    zIndex: 1000
  },
  rootExpanded: {
    width: 270
  },
  expandButton: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 10,
    fill: '#fff',
    '&:hover': {
      background: 'none',
      fill: theme.palette.primary.main
    }
  },
  overlay: {
    display: 'none',
    position: 'fixed',
    zIndex: 900,
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100 * var(--vh))',
    'backdrop-filter': 'blur(3px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  overlayVisible: {
    display: 'block'
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
    setExpanded((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : 'unset'
      return !prev
    })
  }

  return (
    <>
      <aside
        className={clsx({
          [classes.root]: true,
          [classes.rootExpanded]: isExpanded
        })}
      >
        <NavList />
        <UserInfo name={data?.userData.name || ''} picture={data?.userData.picture || ''} />
        <IconButton
          disableRipple
          className={classes.expandButton}
          onClick={handleExpandButtonClick}
        >
          <Icon>{isExpanded ? <LeftArrowIcon /> : <RightArrowIcon />}</Icon>
        </IconButton>
      </aside>
      <div
        onClick={handleExpandButtonClick}
        className={clsx({
          [classes.overlay]: true,
          [classes.overlayVisible]: isExpanded
        })}
      />
    </>
  )
}

export default SideBar
