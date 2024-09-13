import { useEffect, useState } from './react-hooks'

const PREFIX = 'codecanvas:'

if (!PREFIX) {
  // Use the default prefix
  console.warn('No localStorage prefix provided. Using default prefix.')
}

var useLocalStorage = function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX.concat(key)

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage