import React, { useState } from 'react'

export function Greyout() {
  const [disabled, setDisabled] = useState(true)

  return (
    <div className='ui container'>
      <PostList
        style={{
          opacity: disabled ? 0.25 : 1,
          pointerEvents: disabled ? 'none' : 'initial',
        }}
      />
    </div>
  )
}
