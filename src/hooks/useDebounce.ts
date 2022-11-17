import { useRef } from 'react'

export const useDebounce = (fn: any, delay = 1000) => {
  const timeoutRef: any = useRef(null)

  return (searchedTerm: any) => {
    window.clearTimeout(timeoutRef.current)

    if (!searchedTerm.length) {
      delay = 0
    } else if (searchedTerm.length < 3) {
      return
    }

    timeoutRef.current = window.setTimeout(() => {
      fn(searchedTerm)
    }, delay)
  }
}
