import React from 'react'
import styled from 'styled-components'
import SideBar from '../SideBar/SideBar'
import Snackbar from '../Snackbar/Snackbar'
import { useQuery } from '@apollo/client'
import { GET_SNACKBAR_EVENT } from '../../apollo/cache/queries/shared'
import { GET_AUTHENTICATION_STATE } from '../../apollo/cache/queries/user'
import { useWindowHeight } from '../../hooks'

interface AppLayoutProps {
  children: React.ReactNode
}

const Box = styled.div`
  display: flex;
  height: 100vh;
`

const MainContent = styled.main`
  width: 100%;
  overflow-y: auto;
  background-color: #313131;
  padding-left: 70px;
`

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useWindowHeight()
  const auth = useQuery(GET_AUTHENTICATION_STATE)

  const isAuth = auth.data?.isAuthenticated

  const snackbarEvent = useQuery(GET_SNACKBAR_EVENT)
  const snackbarData = snackbarEvent.data.snackbarEvent

  return (
    <Box>
      {isAuth && <SideBar />}
      <MainContent>{children}</MainContent>
      <Snackbar message={snackbarData.message} type={snackbarData.type} />
    </Box>
  )
}

export default AppLayout
