import { useState } from 'react'
import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (status) => {
  const [fetchMore, setFetchMore] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
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
  }, [status, fetchMore])

  return { anchorRef, fetchMore }
}
