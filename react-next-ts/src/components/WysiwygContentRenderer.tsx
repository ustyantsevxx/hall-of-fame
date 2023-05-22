import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import clsx from 'clsx'
import { FC, HTMLAttributes, useMemo } from 'react'

import styles from './WysiwygContentRenderer.module.css'

type Props = HTMLAttributes<HTMLDivElement> & {
  htmlContent: string
  noEmptyTagsStrip?: boolean
  noTrim?: boolean
}

export const WysiwygContentRenderer: FC<Props> = ({
  className,
  noEmptyTagsStrip,
  noTrim,
  htmlContent
}) => {
  const formattedContent = useMemo(() => {
    if (!htmlContent) {
      return ''
    }

    let result = htmlContent

    if (!noTrim) {
      result = result.trim()
    }

    if (!noEmptyTagsStrip) {
      result = htmlContent.replace(/<[^/>][^>]*><\/[^>]+>/, '')
    }

    return result
  }, [htmlContent, noEmptyTagsStrip, noTrim])

  if (formattedContent.length === 0) {
    return null
  }

  return (
    <div
      className={clsx('ql-editor !p-0', styles['ql-editor'], className)}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  )
}
