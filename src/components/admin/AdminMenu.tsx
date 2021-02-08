import { Flex } from '@chakra-ui/layout'
import { Button, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useAuthCtx } from '@ctx'

const AdminMenu = () => {
  const { logout } = useAuthCtx()
  return (
    <Flex
      w="20%"
      bg="orange.50"
      p={5}
      position="sticky"
      top={0}
      flexDir="column"
      alignItems="center"
      height="100vh"
      justifyContent="center"
    >
      {MenuItems.map((el, i) => {
        return (
          <NextLink href={el.path} key={i}>
            <Link color="gray.700" fontSize={20} fontWeight="500" p={4}>
              {el.name}
            </Link>
          </NextLink>
        )
      })}
      <Button
        w="fit-content"
        type="button"
        onClick={() => logout()}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            logout()
          }
        }}
        mt={5}
        fontSize={20}
      >
        Log out
      </Button>
    </Flex>
  )
}

export default AdminMenu

const MenuItems = [
  {
    name: 'Home',
    path: '/admin/dashboard',
  },
  {
    name: 'Books',
    path: '/admin/books',
  },
  {
    name: 'Authors',
    path: '/admin/authors',
  },
  {
    name: 'Checkout',
    path: '/admin/checkout',
  },
  {
    name: 'Users',
    path: '/admin/users',
  },
]
