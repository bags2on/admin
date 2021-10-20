import React from 'react'
import { ReactComponent as AvatarIcon } from '../../../asset/svg/icons/avatar.svg'
import { makeStyles } from '@material-ui/core/styles'

type receiver = {
  name: string | undefined
  surname: string | undefined
  email: string | undefined
  phone: string | undefined
}

interface InfoProps {
  receiver: receiver
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px 0 10px'
  },
  customerBox: {
    display: 'flex',
    backgroundColor: '#3c3c3c',
    padding: '15px 10px'
  },
  avatarIcon: {
    width: 175,
    fill: theme.palette.primary.main,
    marginRight: 20
  },
  customerInfoField: {
    '& span': {
      userSelect: 'none',
      fontWeight: 600,
      marginRight: 10,
      color: '#24ffb6'
    }
  },
  deliveryBox: {}
}))

const Info: React.FC<InfoProps> = ({ receiver }) => {
  const classes = useStyles()

  const { name, surname, email, phone } = receiver

  return (
    <section className={classes.root}>
      <div className={classes.customerBox}>
        <AvatarIcon className={classes.avatarIcon} />
        <div>
          <p className={classes.customerInfoField}>
            <span>Имя:</span>
            {name}
          </p>
          <p className={classes.customerInfoField}>
            <span>Фамилия:</span>
            {surname}
          </p>
          <p className={classes.customerInfoField}>
            <span>Email:</span>
            {email}
          </p>
          <p className={classes.customerInfoField}>
            <span>Телефон:</span>
            {phone}
          </p>
        </div>
      </div>
      <div className={classes.deliveryBox}></div>
    </section>
  )
}

export default Info
