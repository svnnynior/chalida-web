import React, { useState, useEffect, useCallback, useRef } from "react"

type VisibilityObject = {
  rect: ClientRect | DOMRect | null
  isVisible: boolean
}

type RefCallback = (node: HTMLElement | null) => void

interface VisibilityTrackingProps {
  onChange?: (...args: any[]) => any
  partiallyVisible?: boolean
  minimumTop?: number
  scrollCheck?: boolean
  scrollDelay?: number
  scrollThrottleLimit?: number
  resizeCheck?: boolean
  resizeDelay?: number
  resizeThrottleLimit?: number
  offset?: {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }
}

function useVisibilityTracking({
  onChange,
  partiallyVisible = false,
  minimumTop = 0,
  scrollCheck = true,
  scrollThrottleLimit = 100,
  resizeCheck = false,
  resizeThrottleLimit = 100,
  offset = {},
}: VisibilityTrackingProps = {}): [RefCallback, VisibilityObject] {
  const [isVisible, setIsVisible] = useState(false)
  const rectRef = useRef<ClientRect | DOMRect | null>(null)
  const eventListenersRef = useRef<any>(null)

  const checkVisibility = useCallback(() => {}, [])

  const addEventListener = useCallback(
    (event, throttleLimit) => {
      if (!eventListenersRef.current) {
        eventListenersRef.current = {}
      }
      const eventListeners = eventListenersRef.current
      let timeout: number | null
      const eventListenerFn = () => {
        if (!timeout) {
          timeout = setTimeout(
            visibilityCheckCallback,
            throttleLimit < 0 ? 0 : throttleLimit
          )
        }
      }

      const visibilityCheckCallback = () => {
        timeout = null
        checkVisibility()
      }

      const eventListenerInfo = {
        eventListenerFn: eventListenerFn,
        getTimeout: () => {
          return timeout
        },
      }

      window.addEventListener(event, eventListenerInfo.eventListenerFn)
      eventListeners[event] = eventListenerInfo

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
      }
    },
    [checkVisibility]
  )

  // use "callback ref" instead of normal useRef
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const elementCallbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        rectRef.current = node.getBoundingClientRect()
        if (scrollCheck) {
          addEventListener("scroll", scrollThrottleLimit)
        }
        if (resizeCheck) {
          addEventListener("resize", resizeThrottleLimit)
        }
      }
    },
    [
      scrollCheck,
      resizeCheck,
      addEventListener,
      scrollThrottleLimit,
      resizeThrottleLimit,
    ]
  )

  const rect = rectRef.current
  return [elementCallbackRef, { rect, isVisible }]
}

export default useVisibilityTracking
