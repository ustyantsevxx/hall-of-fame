/* eslint-disable */
// @ts-nocheck

import React, { useContext, useEffect, useRef, useState } from 'react'

import GlobalContext from '../context/Global'
import ProgressContext from '../context/Progress'
import StoriesContext from '../context/Stories'
import {
  GlobalCtx,
  StoriesContext as StoriesContextInterface
} from '../interfaces'
import ProgressArray from './ProgressArray'
import Story from './Story'

export default function () {
  const [currentId, setCurrentId] = useState<number>(0)
  const [pause, setPause] = useState<boolean>(true)
  const [bufferAction, setBufferAction] = useState<boolean>(true)
  const [videoDuration, setVideoDuration] = useState<number>(0)

  const mousedownId = useRef<any>()
  const isMounted = useRef<boolean>(true)

  const {
    loop,
    currentIndex,
    isPaused,
    keyboardNavigation,
    preventDefault,
    onNext,
    onPrev,
    onAllStoriesEnd,
    onFirstPrevious,
    storyContainerStyles = {}
  } = useContext<GlobalCtx>(GlobalContext)
  const { stories } = useContext<StoriesContextInterface>(StoriesContext)

  useEffect(() => {
    setCurrentId(0)
  }, [stories])

  useEffect(() => {
    if (typeof currentIndex === 'number') {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        setCurrentIdWrapper(() => currentIndex)
      } else {
        console.error(
          'Index out of bounds. Current index was set to value more than the length of stories array.',
          currentIndex
        )
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (typeof isPaused === 'boolean') {
      setPause(isPaused)
    }
  }, [isPaused])

  useEffect(() => {
    const isClient = typeof window !== 'undefined' && window.document
    if (
      isClient &&
      typeof keyboardNavigation === 'boolean' &&
      keyboardNavigation
    ) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [keyboardNavigation])

  // Cleanup mounted state - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      previous()
    } else if (e.key === 'ArrowRight') {
      next()
    }
  }

  const toggleState = (action: string, bufferAction?: boolean) => {
    setPause(action === 'pause')
    setBufferAction(!!bufferAction)
  }

  const setCurrentIdWrapper = (callback: any) => {
    setCurrentId(callback)
    toggleState('pause', true)
  }

  const previous = () => {
    setCurrentIdWrapper((prev: any) => {
      if (prev > 0) {
        return prev - 1 
      }
      onFirstPrevious?.()
      return prev
      
    })
    onPrev?.()
  }

  const next = () => {
    if (isMounted.current) {
      if (loop) {
        updateNextStoryIdForLoop()
      } else {
        updateNextStoryId()
      }
    }
    onNext?.()
  }

  const updateNextStoryIdForLoop = () => {
    setCurrentIdWrapper(prev => (prev + 1) % stories.length)
  }

  const updateNextStoryId = () => {
    setCurrentIdWrapper(prev => {
      if (prev < stories.length - 1) {
        return prev + 1
      }
      onAllStoriesEnd?.()
      return prev
    })
  }

  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    mousedownId.current = setTimeout(() => {
      toggleState('pause')
    }, 200)
  }

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      mousedownId.current && clearTimeout(mousedownId.current)
      if (pause) {
        toggleState('play')
      } else {
        type === 'next' ? next() : previous()
      }
    }

  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000)
  }

  return (
    <div
      className="relative flex h-full !w-full flex-col bg-black"
      style={storyContainerStyles}
    >
      <ProgressContext.Provider
        value={{
          bufferAction: bufferAction,
          videoDuration: videoDuration,
          currentId,
          pause,
          next
        }}
      >
        <ProgressArray />
      </ProgressContext.Provider>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        story={stories[currentId]}
        getVideoDuration={getVideoDuration}
      />
      {!preventDefault && (
        <div className="absolute inset-0 flex" onContextMenu={e => e.preventDefault()}>
          <div
            style={{ width: '50%', zIndex: 999, cursor: 'pointer' }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp('previous')}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp('previous')}
          />
          <div
            style={{ width: '50%', zIndex: 999, cursor: 'pointer' }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp('next')}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp('next')}
          />
        </div>
      )}
    </div>
  )
}
