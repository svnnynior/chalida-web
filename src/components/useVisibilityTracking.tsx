import React, { useState, useEffect, useCallback, useRef } from "react"
import { throttle } from "../utils/utils"

type VisibilityObject = {
  rect: ClientRect | DOMRect | null
  isVisible: boolean
}

type RefCallback = (node: HTMLElement | null) => void

function useVisibilityTracking(): [RefCallback, VisibilityObject] {
  const [isVisible, setIsVisible] = useState(false)
  const rectRef = useRef<ClientRect | DOMRect | null>(null)
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      rectRef.current = node.getBoundingClientRect()
      document.addEventListener("scroll", scrollListener)
    }
  }, [])

  const scrollListener = useCallback(() => {
    const rect = rectRef.current
    if (rect) {
      console.log(window.innerHeight)
      console.log(rect.top)
    }
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener("scroll", scrollListener)
    }
  }, [])

  const rect = rectRef.current
  return [ref, { rect, isVisible }]
}

export default useVisibilityTracking
