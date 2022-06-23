import React, { useState } from 'react'
import styled from 'styled-components'
import NavList from './NavList/NavList'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import UserInfo from './UserInfo/UserInfo'
import { useQuery } from '@apollo/client'
import { GET_USER_DATA } from '../../apollo/cache/queries/user'
import { ReactComponent as RightArrowIcon } from '../../asset/svg/right-arrow.svg'
import { ReactComponent as LeftArrowIcon } from '../../asset/svg/left-arrow.svg'

interface userData {
  id: string
  name: string
  picture: string
}

interface userDataQuery {
  userData: userData
}

interface AsideProps {
  expanded: boolean
}

const Aside = styled.aside<AsideProps>`
  width: ${({ expanded }) => (expanded ? 270 : 70)}px;
  height: 100%;
  position: fixed;
  background-color: #232323;
  overflow-x: hidden;
  transition: all 0.2s;
  z-index: 1000;
`

const ExpandButton = styled(IconButton)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  fill: #fff;
  &:hover {
    background: none;
    fill: yellow; // TODO: needs teme
  }
`

interface OverlayProps {
  visible: boolean
}

const Overlay = styled.div<OverlayProps>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100 * var(--vh));
  background-color: rgba(0, 0, 0, 0.4);
`

const SideBar: React.FC = () => {
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const { data } = useQuery<userDataQuery>(GET_USER_DATA)

  const handleExpandButtonClick = (): void => {
    setExpanded((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : 'unset'
      return !prev
    })
  }

  return (
    <>
      <Aside expanded={isExpanded}>
        <NavList />
        <UserInfo name={data?.userData.name || ''} picture={data?.userData.picture || ''} />
        <ExpandButton disableRipple onClick={handleExpandButtonClick}>
          <Icon>{isExpanded ? <LeftArrowIcon /> : <RightArrowIcon />}</Icon>
        </ExpandButton>
      </Aside>
      <Overlay onClick={handleExpandButtonClick} visible={isExpanded} />
    </>
  )
}

export default SideBar
