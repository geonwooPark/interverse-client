import React from 'react'
import { Image as VImage } from 'ventileco-ui'

type ImageProps = React.ComponentProps<typeof VImage>

export default function Image(props: ImageProps) {
  return <VImage {...props} placeholder="#ededed" />
}
