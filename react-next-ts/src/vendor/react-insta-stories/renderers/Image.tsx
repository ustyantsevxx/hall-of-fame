/* eslint-disable */
// @ts-nocheck
import * as React from 'react'
import Spinner from '../components/Spinner'
import { Renderer, Tester } from '../interfaces'
import WithHeader from './wrappers/withHeader'
import WithSeeMore from './wrappers/withSeeMore'

export const renderer: Renderer = ({ story, action, config }) => {
  const [loaded, setLoaded] = React.useState(false)
  const { width, height, loader, storyStyles } = config
  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {})
  }

  const imageLoaded = () => {
    setLoaded(true)
    action('play')
  }

  const { description, title, href } = story


  return (
    <WithHeader story={story} globalHeader={config.header}>
      <WithSeeMore story={story} action={action}>
        <div className="h-full w-full">
          <img style={computedStyles} src={story.url} onLoad={imageLoaded} />

          {<div className='flex flex-col pointer-events-none h-full absolute inset-x-0 bottom-0 p-40 pb-50 z-[1001] shadow-sm'>
            {<p className='flex items-end grow overflow-hidden text-regular-17 break-words text-white'>{description}</p>}

            {href && title && <a target="_blank" rel="noopener noreferrer" href={href} className='!bg-pink mt-26  !pointer-events-auto !text-black w-full pt-11 pb-9 text-center rounded-100 block text-medium-17'>{title}</a>}
          </div>}

          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: 'absolute',
                left: 0,
                top: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 9,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ccc'
              }}
            >
              {loader || <Spinner />}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  )
}

const styles = {
  story: {
    display: 'flex',
    position: 'relative',
    overflow: 'hidden'
  },
  storyContent: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    objectFit: 'cover',
    height: '100%'
  }
}

export const tester: Tester = story => {
  return {
    condition: !story.content && (!story.type || story.type === 'image'),
    priority: 2
  }
}

export default {
  renderer,
  tester
}
