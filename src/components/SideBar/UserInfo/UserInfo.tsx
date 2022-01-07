import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ReactComponent as SignOutIcon } from '../../../asset/svg/icons/sign-out.svg'
import { UserMutations } from '../../../apollo/cache/mutations'

interface UserInfoProps {
  name: string
  picture: string
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    bottom: 0,
    overflowX: 'hidden',
    padding: '13px 10px 13px 10px',
    display: 'flex',
    alignItems: 'center',
    width: 'inherit',
    backgroundColor: '#444444'
  },
  image: {
    display: 'block',
    width: 50,
    borderRadius: '50%',
    marginRight: 10
  },
  name: {
    margin: 0,
    fontWeight: 600,
    color: '#fff'
  },
  signoutBtn: {
    fill: 'red'
  }
}))

const UserInfo: React.FC<UserInfoProps> = ({ name, picture }) => {
  const classes = useStyles()

  const handleLogout = () => {
    UserMutations.logout()
  }

  return (
    <div className={classes.root}>
      <img src={picture} alt={name} className={classes.image} />
      <span className={classes.name}>{name}</span>
      <IconButton disableRipple className={classes.signoutBtn} onClick={handleLogout}>
        <Icon>
          <SignOutIcon />
        </Icon>
      </IconButton>
    </div>
  )
}

export default UserInfo
