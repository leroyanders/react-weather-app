import React from 'react'
import { CloudIcon } from '@heroicons/react/solid'

function Loading() {
  return (
    <div className="weather-country mt-40">
        <CloudIcon className="w-20 mx-auto animate-bounce"/>
        <p className="pt-3">Loading weather...</p>
    </div>
  )
}

export default Loading;