import React from 'react'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ActiveOrdersIcon } from '../../../asset/svg/supplies.svg'
import { ReactComponent as CommunicationIcon } from '../../../asset/svg/messages.svg'
import { ReactComponent as CreateProductIcon } from '../../../asset/svg/create_product.svg'
import { ReactComponent as StorageIcon } from '../../../asset/svg/storage.svg'
import { ReactComponent as BannerIcon } from '../../../asset/svg/filter-picture.svg'
import { ReactComponent as UIicon } from '../../../asset/svg/ui.svg'
import { makeStyles } from '@material-ui/core/styles'
import routeNames from '../../../utils/routeNames'

interface NavListProsp {
  isExpanded: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 80,
    paddingLeft: 10,
    overflowX: 'hidden',
    transition: 'all .2s'
  },
  rootExpanded: {
    width: 300
  },
  drawerItem: {
    padding: '6px 0'
  },
  icon: {
    marginRight: 20,
    height: 42,
    fontSize: 40,
    fill: '#fff',
    transition: 'all .2s'
  },
  linkWrapper: {
    padding: '8px 0 8px 8px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 400,
    textDecoration: 'none',
    width: 'inherit',
    transition: 'all .2s',
    '&:hover:not($active)': {
      color: theme.palette.primary.main,
      '& $icon': {
        fill: theme.palette.primary.main
      }
    }
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    color: '#282828',
    '& $icon': {
      fill: '#282828'
    }
  }
}))

const navItems = [
  {
    text: 'Создать',
    icon: CreateProductIcon,
    path: routeNames.createProduct
  },
  {
    text: 'Ордера',
    icon: ActiveOrdersIcon,
    path: routeNames.orders
  },

  {
    text: 'Товары',
    icon: StorageIcon,
    path: routeNames.products
  },
  {
    text: 'Баннеры',
    icon: BannerIcon,
    path: routeNames.banners
  },
  {
    text: 'Коммуникация',
    icon: CommunicationIcon,
    path: routeNames.communication
  },
  {
    text: 'UI',
    icon: UIicon,
    path: routeNames.ui
  }
]

const NavList: React.FC<NavListProsp> = ({ isExpanded }) => {
  const classes = useStyles()

  return (
    <nav
      className={clsx({
        [classes.root]: true,
        [classes.rootExpanded]: isExpanded
      })}
    >
      <List component="ul" aria-label="Навигация">
        {navItems.map((item) => (
          <ListItem key={item.text} component="li" className={classes.drawerItem}>
            <NavLink
              to={item.path}
              className={classes.linkWrapper}
              activeClassName={classes.active}
            >
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
