/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import MiUIcon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ActiveOrdersIcon } from '../../../asset/svg/supplies.svg'
import { ReactComponent as CommunicationIcon } from '../../../asset/svg/messages.svg'
import { ReactComponent as CreateProductIcon } from '../../../asset/svg/create_product.svg'
import { ReactComponent as StorageIcon } from '../../../asset/svg/storage.svg'
import { ReactComponent as BannerIcon } from '../../../asset/svg/filter-picture.svg'
import { ReactComponent as UIicon } from '../../../asset/svg/ui.svg'
import routeNames from '../../../utils/routeNames'

const Nav = styled.nav`
  padding-left: 10px;
`

const DrawerItem = styled.li`
  padding: 6px 0;
`

const Icon = styled(MiUIcon)`
  margin-right: 20px;
  height: 42px;
  font-size: 35px;
  fill: #fff;
  transition: all 0.2s;
`

const Link = styled(NavLink)`
  padding: 8px 0 8px 7px;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 400;
  text-decoration: none;
  width: inherit;
  transition: all 0.2s;
  &:hover:not(.active) {
    & > .icon {
      transform: scale(1.2);
      fill: yellow; // TODO: needs theme
    }
  }
  &.active {
    & > .icon {
      fill: yellow; // TODO: needs theme
    }
  }
`

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
    path: routeNames.catalog
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

const NavList: React.FC = () => {
  return (
    <Nav>
      <List component="ul" aria-label="Навигация">
        {navItems.map((item) => (
          <DrawerItem key={item.text}>
            <Link to={item.path}>
              <Icon>
                <item.icon />
              </Icon>
              <Typography>{item.text}</Typography>
            </Link>
          </DrawerItem>
        ))}
      </List>
    </Nav>
  )
}

export default NavList
