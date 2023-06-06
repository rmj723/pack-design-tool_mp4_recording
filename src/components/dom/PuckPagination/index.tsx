import { useState, useEffect } from 'react'
import useStore from '@/lib/store'
import pucks from '@/content/pucks'
export default function PuckPagination() {
  const activeIndex = useStore((state) => state.activeIndex)

  return (
    <div className='absolute bottom-16 left-[50%] translate-x-[-50%]'>
      <span className='active-index'>{activeIndex + 1}</span>
      <span className='divider'>/</span>
      <span className='total-index'>{pucks.length}</span>
    </div>
  )
}
