/* eslint-disable */
// @ts-nocheck
import clsx from 'clsx'
import React, { useContext, useEffect, useRef, useState } from 'react'

import CloseSvg from '../../../assets/svg/Close.svg'
import GlobalContext from '../context/Global'
import ProgressCtx from '../context/Progress'
import StoriesContext from '../context/Stories'
import {
  GlobalCtx,
  ProgressContext,
  StoriesContext as StoriesContextInterface
} from '../interfaces'
import Progress from './Progress'

export default () => {
  const [count, setCount] = useState<number>(0)
  const { currentId, next, videoDuration, pause } =
    useContext<ProgressContext>(ProgressCtx)
  const {
    defaultInterval,
    onStoryEnd,
    onStoryStart,
    onAllStoriesEnd,
    onClose,
  } = useContext<GlobalCtx>(GlobalContext)
  const { stories } = useContext<StoriesContextInterface>(StoriesContext)

  useEffect(() => {
    setCount(0)
  }, [currentId, stories])

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount)
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [currentId, pause])

  const animationFrameId = useRef<number>()

  let countCopy = count
  const incrementCount = () => {
    if (countCopy === 0) {
      storyStartCallback()
    }
    setCount((count: number) => {
      const interval = getCurrentInterval()
      countCopy = count + 100 / ((interval / 1000) * 60)
      return count + 100 / ((interval / 1000) * 60)
    })
    if (countCopy < 100) {
      animationFrameId.current = requestAnimationFrame(incrementCount)
    } else {
      storyEndCallback()
      if (currentId === stories.length - 1) {
        allStoriesEndCallback()
      }
      cancelAnimationFrame(animationFrameId.current)
      next()
    }
  }

  const storyStartCallback = () => {
    onStoryStart && onStoryStart(currentId, stories[currentId])
  }

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd(currentId, stories[currentId])
  }

  const allStoriesEndCallback = () => {
    onAllStoriesEnd && onAllStoriesEnd(currentId, stories)
  }

  const getCurrentInterval = () => {
    if (stories[currentId].type === 'video') {
      return videoDuration
    }
    if (typeof stories[currentId].duration === 'number') {
      return stories[currentId].duration
    }
    return defaultInterval
  }

  return (
    <div style={styles.progressArr}>
      {stories.map((_, i) => (
        <Progress
          key={i}
          count={count}
          width={1 / stories.length}
          active={i === currentId ? 1 : i < currentId ? 2 : 0}
        />
      ))}

      <button className={clsx('transition duration-500 ml-16 outline-none', {
        'opacity-0': pause,
      })} onClick={onClose}>
        <CloseSvg className="text-white" width={24} height={24} />
      </button>
    </div>
  )
}

const styles = {
  progressArr: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    alignItems: 'center',
    flexWrap: 'row',
    position: 'absolute',
    width: '98%',
    padding: 16,
    alignSelf: 'center',
    zIndex: 1001,
    filter: 'drop-shadow(0 1px 8px #222)'
  }
}
