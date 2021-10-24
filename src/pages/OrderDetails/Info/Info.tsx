import React from 'react'
import clsx from 'clsx'
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

type delivery = {
  city: string | undefined
  supplier: string | undefined
  postOffice: string | undefined
}

interface InfoProps {
  receiver: receiver
  delivery: delivery
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px 0 10px'
  },
  wrapper: {
    backgroundColor: '#3c3c3c',
    padding: '10px 10px',
    marginBottom: 20,
    borderRadius: 15
  },
  listTitle: {
    margin: 0,
    marginBottom: 10
  },
  customerBox: {
    display: 'flex'
  },
  avatarIcon: {
    width: 100,
    fill: theme.palette.primary.main,
    marginRight: 20
  },
  supplierIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    width: 100,
    borderTopRightRadius: 15,
    padding: '0 4px',
    borderBottomLeftRadius: 15
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
    display: 'flex',
    position: 'relative'
  },
  deliveryRow: {
    width: '100%',
    maxWidth: 330
  },
  supplierField: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const Info: React.FC<InfoProps> = ({ receiver, delivery }) => {
  const classes = useStyles()

  const { name, surname, email, phone } = receiver
  const { supplier, city, postOffice } = delivery

  return (
    <section className={classes.root}>
      <h1 className={classes.listTitle}>Общая информация:</h1>
      <div className={clsx(classes.wrapper, classes.customerBox)}>
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
      <div className={clsx(classes.wrapper, classes.deliveryBox)}>
        <div className={classes.deliveryRow}>
          <p className={clsx(classes.infoField, classes.supplierField)}>
            <span>Служба доставки:</span>
            &#34;{supplier}&#34;
          </p>
          <p className={classes.infoField}>
            <span>Область:</span>
            {city}
          </p>
        </div>
        <div className={classes.deliveryRow}>
          <p className={classes.infoField}>
            <span>Отделение №:</span>
            {postOffice}
          </p>
          <p className={classes.infoField}>
            <span>Город:</span>
            {city}
          </p>
        </div>
        <div className={classes.supplierIcon}>
          {supplier === 'nova-poshta' ? <NovaPoshtaIcon /> : <JustinIcon />}
        </div>
      </div>
    </section>
  )
}

export default Info
