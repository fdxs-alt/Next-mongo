import React from 'react'
import { AuthorWithID } from '@db'
interface Props {
  id: string
  author: AuthorWithID
}

const About: React.FC<Props> = ({ id }): JSX.Element => {
  return <div>{id}</div>
}

export default About
