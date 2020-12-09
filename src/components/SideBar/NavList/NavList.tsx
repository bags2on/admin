import React from 'react'
import List from '@material-ui/core/List'
import SvgIcon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { ReactComponent as CreateProductIcon } from '../../../asset/svg/new_product.svg'
import { ReactComponent as ActiveOrdersIcon } from '../../../asset/svg/ready_orders.svg'
import { makeStyles } from '@material-ui/core/styles'
import routeNames from '../../../utils/routeNames'

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 10
  },
  drawerItem: {
    padding: '5px 0'
  },
  icon: {
    marginRight: 10,
    height: 42,
    fontSize: 40
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: '#343434',
    fontWeight: 400,
    textDecoration: 'none'
  }
}))

const navItems = [
  {
    text: 'Создать товар',
    icon: CreateProductIcon,
    path: routeNames.createProduct
  },
  {
    text: 'Активные заказы',
    icon: ActiveOrdersIcon,
    path: routeNames.activeOrders
  }
]

const NavList: React.FC = () => {
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <List component="ul" aria-label="Навигация">
        {navItems.map((item) => (
          <ListItem key={item.text} component="li" className={classes.drawerItem}>
            <NavLink to={item.path} className={classes.linkWrapper}>
              <SvgIcon className={classes.icon}>
                <item.icon />
              </SvgIcon>
              <Typography>{item.text}</Typography>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}

export default NavList
