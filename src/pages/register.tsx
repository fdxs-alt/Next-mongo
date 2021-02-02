import {
    Flex, Img,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Divider,
    Spacer,
    Button,
    Heading,
} from '@chakra-ui/react'
import { Layout } from '@components'
import { Field, Form, Formik } from 'formik'
import React from 'react'

interface Props { }

const Register: React.FC<Props> = (): JSX.Element => {
    return (
        <Layout title="Register">
            <Flex alignItems="center" justifyContent="space-between" w="80%" h="80%">
                <Img src="/register.jpg" width="100%" maxWidth="650px" />
                <Spacer />
                <Divider orientation="vertical" maxH={800} h="80vh" />
                <Spacer />
                <Formik initialValues={{ email: "", nickname: "", password: "", repeatPassword: "" }} onSubmit={(values) => console.log(values)}>
                    {(formik) => (
                        <Flex w="35%" flexDirection="column" alignItems="center" p={10} as={Form}>
                            <Heading as="h1" mb={5}>Register</Heading>
                            <FormControl w="100%" mb={5}>
                                <FormLabel>Email address</FormLabel>
                                <Field type="email" name="email" required as={Input} />
                                <FormHelperText>We'll use this email to confirm your account.</FormHelperText>
                            </FormControl>
                            <FormControl w="100%" mb={5}>
                                <FormLabel>Nickname</FormLabel>
                                <Field type="text" name="nickname" required as={Input} />
                                <FormHelperText>We'll use it to recognize you</FormHelperText>
                            </FormControl>
                            <FormControl w="100%" mb={5}>
                                <FormLabel>Password</FormLabel>
                                <Field type="password" name="password" required as={Input} />
                                <FormHelperText>Make it atleast strong</FormHelperText>
                            </FormControl>
                            <FormControl w="100%" mb={5}>
                                <FormLabel>Repeat password</FormLabel>
                                <Field type="password" name="repeat-password" required as={Input} />
                            </FormControl>
                            <Button w="fit-content" type="submit">Sign up</Button>
                        </Flex>)}
                </Formik>
            </Flex >
        </Layout >)
}

export default Register