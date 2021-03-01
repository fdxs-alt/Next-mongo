import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import { IAuthorForm } from '.'

interface Props {
  handleSubmit: (arg: any) => Promise<void>
  author: IAuthorForm
  isToUpdate: boolean
  changeState: () => void
}

const AuthorUpdate: React.FC<Props> = ({
  author,
  handleSubmit,
  isToUpdate,
  changeState,
}) => {
  return (
    <Box w="75%">
      <Formik
        initialValues={author}
        onSubmit={async (values, { setSubmitting }) => {
          await handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl id="name" mb={2}>
              <FormLabel>Name</FormLabel>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Name"
                required
                disabled={isToUpdate || isSubmitting}
              />
            </FormControl>
            <FormControl id="surname" mb={2}>
              <FormLabel>Surname</FormLabel>
              <Field
                name="surname"
                type="text"
                as={Input}
                placeholder="Surname"
                required
                disabled={isToUpdate || isSubmitting}
              />
            </FormControl>
            <FormControl id="dateOfBirth" mb={2}>
              <FormLabel>Date of birth</FormLabel>
              <Field
                name="dateOfBirth"
                type="date"
                as={Input}
                required
                disabled={isToUpdate || isSubmitting}
              />
            </FormControl>
            <FormControl id="dateOfDeath" mb={2}>
              <FormLabel>Date of death</FormLabel>
              <Field
                name="dateOfDeath"
                type="date"
                as={Input}
                disabled={isToUpdate || isSubmitting}
              />
            </FormControl>
            <FormControl id="description" mb={2}>
              <FormLabel>Description</FormLabel>
              <Field
                name="description"
                type="text"
                as={Textarea}
                placeholder="Description"
                disabled={isToUpdate || isSubmitting}
              />
            </FormControl>
            <Button mr={3} type="submit" disabled={isToUpdate || isSubmitting}>
              Update
            </Button>
            <Button
              type="button"
              onClick={() => changeState()}
              disabled={isSubmitting}
            >
              Click to {isToUpdate ? 'start' : 'stop'} updating
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AuthorUpdate
