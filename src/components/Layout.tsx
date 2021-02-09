import { Helmet } from 'react-helmet'
import { Flex } from '@chakra-ui/react'
import Menu from './Menu'
import React from 'react'
import AdminMenu from './admin/AdminMenu'

interface Props {
  title: string
  isAdmin?: boolean
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({
  children,
  title,
  isAdmin,
  ...rest
}): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Flex
        {...rest}
        w="100%"
        flexDirection={isAdmin ? 'row' : 'column'}
        minHeight="100vh"
      >
        {isAdmin ? <AdminMenu /> : <Menu />}
        {children}
      </Flex>
    </>
  )
}

export default Layout
