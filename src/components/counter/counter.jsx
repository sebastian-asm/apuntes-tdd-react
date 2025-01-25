import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>Clicks times: {count}</p>
    </>
  )
}