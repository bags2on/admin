import React from 'react'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { ReactComponent as CreateProductIcon } from '../../../asset/svg/new_product.svg'
import { ReactComponent as ActiveOrdersIcon } from '../../../asset/svg/active_orders.svg'
import { ReactComponent as CommunicationIcon } from '../../../asset/svg/messages.svg'
import { ReactComponent as StorageIcon } from '../../../asset/svg/storage.svg'
import { ReactComponent as BannerIcon } from '../../../asset/svg/filter-picture.svg'
import { ReactComponent as UIicon } from '../../../asset/svg/ui.svg'
// import { ReactComponent as ActiveOrdersIcon } from '../../../asset/svg/shipment-upload.svg'
import { makeStyles } from '@material-ui/core/styles'
import routeNames from '../../../utils/routeNames'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 15
  },
  drawerItem: {
    padding: '6px 0'
  },
  icon: {
    marginRight: 15,
    height: 42,
    fontSize: 40
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: '#343434',
    fontWeight: 400,
    textDecoration: 'none',
    width: 'inherit',
    transition: 'all .2s',
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main
    }
  },
  active: {
    position: 'relative',
    padding: 10,
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    backgroundColor: '#f6f8f9',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: 4,
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      right: 0
    }
  }
}))

const navItems = [
  {
    text: 'Создать товар',
    icon: CreateProductIcon,
    path: routeNames.createProduct
  },
  {
    text: 'Ордера',
    icon: ActiveOrdersIcon,
    path: routeNames.orders
  },
  {
    text: 'Коммуникация',
    icon: CommunicationIcon,
    path: routeNames.communication
  },
  {
    text: 'Склад',
    icon: StorageIcon,
    path: routeNames.storage
  },
  {
    text: 'Баннеры',
    icon: BannerIcon,
    path: routeNames.banners
  },
  {
    text: 'Temp UI page',
    icon: UIicon,
    path: routeNames.ui
  }
]

const NavList: React.FC = () => {
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <List component="ul" aria-label="Навигация">
        {navItems.map((item) => (
          <ListItem key={item.text} component="li" className={classes.drawerItem}>
            <NavLink to={item.path} className={classes.linkWrapper} activeClassName={classes.active}>
              <Icon className={classes.icon}>
                <item.icon />
              </Icon>
              <Typography>{item.text}</Typography>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}

export default NavList
