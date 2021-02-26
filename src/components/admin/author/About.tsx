import React from 'react'
import { AuthorWithID } from '@db'
interface Props {
  author: AuthorWithID
}

const About: React.FC<Props> = ({ author }): JSX.Element => {
  return <div>{JSON.stringify(author)}</div>
}

export default About
