import React, { useState } from 'react'
import NavList from './NavList/NavList'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ReactComponent as RightArrowIcon } from '../../asset/svg/right-arrow.svg'
import { ReactComponent as LeftArrowIcon } from '../../asset/svg/left-arrow.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#232323',
    overflowX: 'hidden'
  },
  expandButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translate(-50%, 0)',
    fill: '#fff',
    '&:hover': {
      background: 'none',
      fill: theme.palette.primary.main
    }
  }
}))

const SideBar: React.FC = () => {
  const classes = useStyles()
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const handleExpandButtonClick = (): void => {
    setExpanded((prev) => !prev)
  }

  return (
    <aside className={classes.root}>
      <NavList isExpanded={isExpanded} />
      <IconButton disableRipple className={classes.expandButton} onClick={handleExpandButtonClick}>
        <Icon>{isExpanded ? <LeftArrowIcon /> : <RightArrowIcon />}</Icon>
      </IconButton>
    </aside>
  )
}

export default SideBar
