import { Flex, Heading, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import Layout from './Layout'

interface Props {
    title: string;
    heading: string;
    isAdmin: boolean
}

const LoginForm: React.FC<Props> = ({ title, heading, isAdmin }): JSX.Element => {
    return (
        <Layout title={title}>
            <Flex alignItems="center" justifyContent="center" w="100%" mt={200}>
                <Formik initialValues={{ nickname: '', password: '' }} onSubmit={(values) => console.log(values)}>
                    {(formik) => (<Flex w="30%" flexDirection="column" alignItems="center" p={10} as={Form}>
                        <Heading as="h1" mb={5}>{heading}</Heading>
                        <FormControl w="100%" mb={5}>
                            <FormLabel>Nickname</FormLabel>
                            <Field type="text" name="nickname" as={Input} required />
                            {!isAdmin && <FormHelperText>Nick given at registration proccess</FormHelperText>}
                        </FormControl>
                        <FormControl w="100%" mb={5}>
                            <FormLabel>Password</FormLabel>
                            <Field type="password" name="password" required as={Input} />
                            {!isAdmin && <FormHelperText>Password given at registration proccess</FormHelperText>}
                        </FormControl>
                        <Button type="submit" w="fit-content">{isAdmin ? "Login" : "Sign in"}</Button>
                    </Flex>)}
                </Formik>
            </Flex>
        </Layout>
    )
}

export default LoginForm