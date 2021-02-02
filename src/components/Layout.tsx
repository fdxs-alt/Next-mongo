import { Helmet } from 'react-helmet'
import { Flex, StyleProps } from '@chakra-ui/react'
import Menu from './Menu'

interface Props { title: string, children: React.ReactNode }

const Layout: React.FC<Props> = ({ children, title, ...rest }): JSX.Element => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Flex {...rest} w="100%" flexDirection="column">
                <Menu />
                {children}
            </Flex>
        </>)
}

export default Layout