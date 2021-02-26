import React, { useRef, useState } from 'react'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { AuthorData } from '@db'
import FileInput from './FileInput'

const initalValues = {
  name: '',
  surname: '',
  dateOfBirth: '',
  dateOfDeath: '',
  description: '',
}
interface Props {
  handleSubmit: (data: AuthorData, image: File) => Promise<void>
}

const AuthorForm: React.FC<Props> = ({ handleSubmit }): JSX.Element => {
  const [image, setImage] = useState<File>(null)

  return (
    <Box>
      <Formik
        initialValues={initalValues}
        onSubmit={(values) => {
          handleSubmit(values, image)
        }}
      >
        {(formik) => (
          <Form>
            <FormControl id="name" mb={2}>
              <FormLabel>Name</FormLabel>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Name"
                required
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
              />
            </FormControl>
            <FormControl id="dateOfBirth" mb={2}>
              <FormLabel>Date of birth</FormLabel>
              <Field name="dateOfBirth" type="date" as={Input} required />
            </FormControl>
            <FormControl id="dateOfDeath" mb={2}>
              <FormLabel>Date of death</FormLabel>
              <Field name="dateOfDeath" type="date" as={Input} />
            </FormControl>
            <FormControl id="description" mb={2}>
              <FormLabel>Description</FormLabel>
              <Field
                name="description"
                type="text"
                as={Textarea}
                placeholder="Description"
              />
            </FormControl>
            <FileInput
              setImage={(image: File) => setImage(image)}
              cta="Add author image"
            />
            <Button mr={3} type="submit">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AuthorForm
