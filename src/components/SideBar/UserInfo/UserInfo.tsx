import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

interface UserInfoProps {
  name: string
  picture: string
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 30,
    overflowX: 'hidden',
    paddingLeft: 12,
    display: 'flex',
    alignItems: 'center',
    width: 'inherit'
  },
  image: {
    display: 'block',
    width: 50,
    borderRadius: '50%',
    marginRight: 10
  },
  name: {
    margin: 0,
    fontWeight: 600
  }
}))

const UserInfo: React.FC<UserInfoProps> = ({ name, picture }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={picture} alt={name} className={classes.image} />
    </div>
  )
}

export default UserInfo
