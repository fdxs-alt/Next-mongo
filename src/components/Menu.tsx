import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Menu: React.FC = (): JSX.Element => {
  return (
    <Box w="100%" bg="orange.50">
      <Flex
        maxWidth="1200px"
        justifyContent="space-between"
        p={10}
        alignItems="center"
        margin="auto"
      >
        {MenuItems.map((el, i) => {
          return (
            <NextLink href={el.path} key={i}>
              <Link color="gray.700" fontSize={18} fontWeight="500">
                {el.name}
              </Link>
            </NextLink>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Menu

const MenuItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Books',
    path: '/books',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'About',
    path: '/about',
  },
]
