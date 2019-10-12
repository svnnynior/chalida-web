import React, { useState, useEffect, useCallback, useRef } from "react"

type Offset = {
  top?: number
  left?: number
  bottom?: number
  right?: number
}
type VisibilityRect = {
  top: number
  left: number
  bottom: number
  right: number
}

type VisibilityPercent = {
  verticalPercent: number
  horizontalPercent: number
  overallPercent: number
}
type VisibilityObject = {
  rect: ClientRect | DOMRect | null
  isVisible: boolean
  percentVisible: VisibilityPercent
}
type RefCallback = (node: HTMLElement | null) => void
type EventListenerInfo = {
  eventListenerFn: () => void
  getTimeout: () => number | null
}

type EventListeners = {
  scroll?: EventListenerInfo
  resize?: EventListenerInfo
}
type ObservedEvent = keyof EventListeners

interface VisibilityTrackingProps {
  onVisibilityChange?: (
    isVisible: boolean,
    percentVisible: VisibilityPercent
  ) => any
  scrollCheck?: boolean
  scrollDelay?: number
  scrollThrottleLimit?: number
  resizeCheck?: boolean
  resizeDelay?: number
  resizeThrottleLimit?: number
  minElementOffset?: Offset
}

function getVisibilityRect(rect: ClientRect | DOMRect): VisibilityRect {
  let visibilityRect: VisibilityRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
  if (rect instanceof DOMRect) {
    visibilityRect = {
      top: Math.floor(rect.y),
      left: Math.floor(rect.x),
      bottom: Math.floor(rect.y + rect.height),
      right: Math.floor(rect.x + rect.width),
    }
  } else {
    visibilityRect = {
      top: Math.floor(rect.top),
      left: Math.floor(rect.left),
      bottom: Math.floor(rect.bottom),
      right: Math.floor(rect.right),
    }
  }

  return visibilityRect
}

function getContainmentRect(): VisibilityRect {
  const containmentRect = {
    top: 0,
    left: 0,
    bottom: window.innerHeight || document.documentElement.clientHeight,
    right: window.innerWidth || document.documentElement.clientWidth,
  }

  return containmentRect
}

export function checkIsVisible(
  nodeRect: VisibilityRect,
  containmentRect: VisibilityRect,
  minElementOffset: Offset
): boolean {
  const nodeWidth = nodeRect.right - nodeRect.left
  const nodeHeight = nodeRect.bottom - nodeRect.top
  const hasSize = nodeWidth > 0 && nodeHeight > 0
  const partialNodeRect = {
    top: nodeRect.top,
    left: nodeRect.left,
    bottom: nodeRect.bottom,
    right: nodeRect.right,
  }
  if (minElementOffset) {
    partialNodeRect.top += minElementOffset.top || 0
    partialNodeRect.left += minElementOffset.left || 0
    partialNodeRect.bottom -= minElementOffset.bottom || 0
    partialNodeRect.right -= minElementOffset.right || 0
  }
  const visibilityObject = {
    top: partialNodeRect.top >= containmentRect.top,
    left: partialNodeRect.left >= containmentRect.left,
    bottom: partialNodeRect.bottom <= containmentRect.bottom,
    right: partialNodeRect.right <= containmentRect.right,
  }

  const isVisible =
    hasSize &&
    visibilityObject.top &&
    visibilityObject.left &&
    visibilityObject.bottom &&
    visibilityObject.right

  return isVisible
}

export function computePercentVisible(
  nodeRect: VisibilityRect,
  containmentRect: VisibilityRect
): VisibilityPercent {
  // No Intersection Case
  if (
    nodeRect.left > containmentRect.right ||
    nodeRect.right < containmentRect.left ||
    nodeRect.top > containmentRect.bottom ||
    nodeRect.bottom < containmentRect.top
  ) {
    return {
      horizontalPercent: 0,
      verticalPercent: 0,
      overallPercent: 0,
    }
  }
  const nodeWidth = nodeRect.right - nodeRect.left
  const nodeHeight = nodeRect.bottom - nodeRect.top
  const horizontalIntersect = Math.min(
    containmentRect.right - containmentRect.left,
    containmentRect.right - nodeRect.left,
    nodeRect.right - containmentRect.left,
    nodeRect.right - nodeRect.left
  )
  const verticalIntersect = Math.min(
    containmentRect.bottom - containmentRect.top,
    containmentRect.bottom - nodeRect.top,
    nodeRect.bottom - containmentRect.top,
    nodeRect.bottom - nodeRect.top
  )

  const horizontalPercent = horizontalIntersect / nodeWidth
  const verticalPercent = verticalIntersect / nodeHeight
  const overallPercent =
    (horizontalIntersect * verticalIntersect) / (nodeWidth * nodeHeight)

  return {
    horizontalPercent,
    verticalPercent,
    overallPercent,
  }
}

function useVisibilityTracking({
  onVisibilityChange,
  scrollCheck = true,
  scrollThrottleLimit = 250,
  resizeCheck = false,
  resizeThrottleLimit = 250,
  minElementOffset = {},
}: VisibilityTrackingProps = {}): [RefCallback, VisibilityObject] {
  const [isVisible, setIsVisible] = useState(false)
  const [percentVisible, setPercentVisible] = useState<VisibilityPercent>({
    horizontalPercent: 0,
    verticalPercent: 0,
    overallPercent: 0,
  })
  const nodeRef = useRef<HTMLElement | null>(null)
  const eventListenersRef = useRef<EventListeners | null>(null)

  const checkVisibility = useCallback(() => {
    const rect =
      nodeRef && nodeRef.current
        ? nodeRef.current.getBoundingClientRect()
        : null
    if (!rect) return

    const nodeRect = getVisibilityRect(rect)
    const containmentRect = getContainmentRect()
    const nextIsVisible = checkIsVisible(
      nodeRect,
      containmentRect,
      minElementOffset
    )
    const percentVisible = computePercentVisible(nodeRect, containmentRect)

    if (isVisible !== nextIsVisible) {
      setIsVisible(nextIsVisible)
    }
    setPercentVisible(percentVisible)
    if (onVisibilityChange) onVisibilityChange(nextIsVisible, percentVisible)
  }, [minElementOffset, isVisible, onVisibilityChange])

  const addEventListener = useCallback(
    (event: ObservedEvent, throttleLimit: number) => {
      if (!eventListenersRef.current) {
        eventListenersRef.current = {}
      }
      const eventListeners = eventListenersRef.current
      let timeout: number | null

      const checkVisibilityCallback = () => {
        timeout = null
        checkVisibility()
      }

      const eventListenerFn = () => {
        if (!timeout) {
          timeout = setTimeout(
            checkVisibilityCallback,
            throttleLimit < 0 ? 0 : throttleLimit
          )
        }
      }

      const eventListenerInfo: EventListenerInfo = {
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
      const eventListeners = eventListenersRef.current
      if (eventListeners) {
        return
      }
      if (node !== null) {
        nodeRef.current = node
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

  useEffect(() => {
    return () => {
      console.log("remove event listeners")
      const eventListners = eventListenersRef.current
      for (const event in eventListners) {
        const eventListenerInfo = eventListners[event as ObservedEvent]
        if (eventListenerInfo !== undefined) {
          if (eventListenerInfo.getTimeout() !== null) {
            clearTimeout(eventListenerInfo.getTimeout()!)
          }
          window.removeEventListener(event, eventListenerInfo.eventListenerFn)
        }
      }
    }
  }, [])

  const rect =
    nodeRef && nodeRef.current && nodeRef.current.getBoundingClientRect()
  return [elementCallbackRef, { rect, isVisible, percentVisible }]
}

export default useVisibilityTracking
