import { useLayoutEffect } from 'react'

export const useWindowHeight = (): void => {
  const vh = (window.innerHeight * 0.01).toFixed(2)
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  useLayoutEffect(() => {
    function updateSize() {
      const vh = (window.innerHeight * 0.01).toFixed(2)
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
}
