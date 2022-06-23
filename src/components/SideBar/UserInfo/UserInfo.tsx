import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ReactComponent as SignOutIcon } from '../../../asset/svg/icons/sign-out.svg'
import { UserMutations } from '../../../apollo/cache/mutations'

interface UserInfoProps {
  name: string
  picture: string
}

const Box = styled.div`
  padding: 13px 10px 13px 10px;
  display: flex;
  align-items: center;
  width: inherit;
  background-color: #444444;
`

const Image = styled.img`
  display: block;
  width: 50%;
  border-radius: 50%;
  margin-right: 10px;
`

const Name = styled.span`
  margin: 0;
  font-weight: 600;
  color: #fff;
`

const SignoutBotton = styled(IconButton)`
  fill: red;
`

const UserInfo: React.FC<UserInfoProps> = ({ name, picture }) => {
  const handleLogout = () => {
    UserMutations.logout()
  }

  return (
    <Box>
      <Image src={picture} alt={name} />
      <Name>{name}</Name>
      <SignoutBotton disableRipple onClick={handleLogout}>
        <Icon>
          <SignOutIcon />
        </Icon>
      </SignoutBotton>
    </Box>
  )
}

export default UserInfo
