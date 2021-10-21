import React from 'react'
import { ReactComponent as AvatarIcon } from '../../../asset/svg/icons/avatar.svg'
import { ReactComponent as NovaPoshtaIcon } from '../../../asset/svg/nova_poshta.svg'
import { ReactComponent as JustinIcon } from '../../../asset/svg/justin.svg'
import { formatPhoneNumber } from '../../../utils/helpers'
import { makeStyles } from '@material-ui/core/styles'

type receiver = {
  name: string | undefined
  surname: string | undefined
  email: string | undefined
  phone: string | undefined
}

interface InfoProps {
  receiver: receiver
  city: string | undefined
  shipper: 'nova-poshta' | 'justin'
  postOffice: string | undefined
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px 0 10px'
  },
  wrapper: {
    display: 'flex',
    backgroundColor: '#3c3c3c'
  },
  listTitle: {
    margin: 0,
    marginBottom: 10
  },
  customerBox: {
    flexBasis: '60%',
    display: 'flex',
    padding: '15px 10px'
  },
  avatarIcon: {
    width: 100,
    fill: theme.palette.primary.main,
    marginRight: 20
  },
  shipperIcon: {
    width: 170,
    margin: '0 auto'
  },
  infoField: {
    '& span': {
      userSelect: 'none',
      fontWeight: 600,
      marginRight: 10,
      color: '#24ffb6'
    }
  },
  deliveryBox: {
    flexBasis: '40%'
  }
}))

const Info: React.FC<InfoProps> = ({ receiver, shipper, city, postOffice }) => {
  const classes = useStyles()

  const { name, surname, email, phone } = receiver

  return (
    <section className={classes.root}>
      <h1 className={classes.listTitle}>Общая информация:</h1>
      <div className={classes.wrapper}>
        <div className={classes.customerBox}>
          <AvatarIcon className={classes.avatarIcon} />
          <div>
            <p className={classes.infoField}>
              <span>Имя:</span>
              {name}
            </p>
            <p className={classes.infoField}>
              <span>Фамилия:</span>
              {surname}
            </p>
            <p className={classes.infoField}>
              <span>Email:</span>
              {email}
            </p>
            <p className={classes.infoField}>
              <span>Телефон:</span>
              {formatPhoneNumber(phone)}
            </p>
          </div>
        </div>
        <div className={classes.deliveryBox}>
          {shipper === 'nova-poshta' ? (
            <NovaPoshtaIcon className={classes.shipperIcon} />
          ) : (
            <JustinIcon className={classes.shipperIcon} />
          )}
          <p className={classes.infoField}>
            <span>Город:</span>
            {city}
          </p>
          <p className={classes.infoField}>
            <span>Отделение:</span>
            {postOffice}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Info
