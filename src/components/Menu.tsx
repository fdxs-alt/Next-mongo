import { Box, Flex, Link, Button } from '@chakra-ui/react'
import { useAuthCtx } from '@ctx'
import { isEmpty } from '@utils'
import NextLink from 'next/link'
import React, { useMemo } from 'react'

const Menu: React.FC = (): JSX.Element => {
  const { user, logout } = useAuthCtx()

  const isUser = useMemo(() => isEmpty(user), [user])

  return (
    <Box w="100%" bg="orange.50">
      <Flex
        maxWidth="1200px"
        justifyContent="space-between"
        p={10}
        alignItems="center"
        margin="auto"
      >
        {MenuItems[!isUser ? 1 : 0].map((el, i) => {
          return (
            <NextLink href={el.path} key={i}>
              <Link color="gray.700" fontSize={18} fontWeight="500">
                {el.name}
              </Link>
            </NextLink>
          )
        })}
        {!isUser && (
          <Button
            w="fit-content"
            type="button"
            onClick={async () => {
              await logout()
            }}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await logout()
              }
            }}
            fontSize={20}
          >
            Log out
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Menu

const MenuItems = [
  [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Dashboard',
      path: '/user/dashboard',
    },
    {
      name: 'Login',
      path: '/login',
    },
  ],
  [
    {
      name: 'Dashboard',
      path: '/user/dashboard',
    },
    {
      name: 'Books',
      path: '/user/books',
    },
    {
      name: 'Checkout',
      path: '/user/checkout',
    },
    {
      name: 'My account',
      path: '/user/account',
    },
  ],
]
