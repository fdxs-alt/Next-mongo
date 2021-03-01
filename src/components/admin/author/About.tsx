import React, { useState } from 'react'
import { AuthorWithID } from '@db'
import { Flex, Image } from '@chakra-ui/react'
import AuthorUpdate from './AuthorUpdate'
import { IAuthorForm } from '.'
interface Props {
  author: AuthorWithID
  handleUpdate: (arg: IAuthorForm) => Promise<void>
}

const About: React.FC<Props> = ({
  author: { image, _id, ...rest },
  handleUpdate,
}): JSX.Element => {
  const [isToUpdate, setIsToUpdate] = useState(true)

  const update = () => {
    setIsToUpdate((prev) => !prev)
  }

  const handleSubmit = async (values: IAuthorForm) => {
    await handleUpdate(values)
    setIsToUpdate(true)
  }

  return (
    <Flex w="40%" direction="column" align="center" p={10}>
      <Image
        src={image?.Location}
        boxSize="300px"
        objectFit="cover"
        borderRadius={10}
      />
      <AuthorUpdate
        author={rest}
        handleSubmit={handleSubmit}
        isToUpdate={isToUpdate}
        changeState={update}
      />
    </Flex>
  )
}

export default About
