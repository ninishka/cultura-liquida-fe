'use client'
 
import React, { useEffect, FC } from 'react'

interface ErrorProps {
  error: Error;
  reset: () => void;
}
 
const Error: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong FROMATION!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}

export default Error