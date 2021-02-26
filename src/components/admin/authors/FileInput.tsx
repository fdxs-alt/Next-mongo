import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useCallback, useRef } from 'react'

interface Props {
  setImage: (image: File) => void
  cta: string
}

const FileInput: React.FC<Props> = ({ setImage, cta }): JSX.Element => {
  const ref = useRef<HTMLInputElement | null>(null)

  const onClick = useCallback(() => {
    if (ref.current) {
      ref.current.click()
    }
  }, [])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files.length) {
        setImage(event.target.files[0])
      }
    },
    [setImage]
  )

  return (
    <FormControl id="file" mb={2}>
      <Button type="button" onClick={onClick}>
        {cta}
      </Button>
      <Input
        name="image"
        type="file"
        ref={ref}
        onClick={onClick}
        onChange={handleChange}
        display="none"
      />
    </FormControl>
  )
}

export default FileInput
