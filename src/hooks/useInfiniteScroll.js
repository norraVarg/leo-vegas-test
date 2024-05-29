import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (status, enabled) => {
  const [fetchMore, setFetchMore] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const anchorEl = anchorRef.current

    const observer = new IntersectionObserver((entries) => {
      const anchorEntry = entries[0]

      if (anchorEntry.isIntersecting && status !== 'loading') {
        setFetchMore(true)
      } else {
        setFetchMore(false)
      }
    })

    if (anchorEl) {
      observer.observe(anchorEl)
    }

    return () => {
      if (anchorEl) {
        observer.unobserve(anchorEl)
      }
    }
  }, [status, fetchMore, enabled])

  return { anchorRef, fetchMore }
}
