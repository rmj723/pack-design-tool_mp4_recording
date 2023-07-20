import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import Header from '@/components/dom/Header'
import RecordingPanel from './RecordingPanel'

const Layout = forwardRef(({ children, ...props }: { children: JSX.Element[] }, ref) => {
  const localRef = useRef()

  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden h-screen-ios dom bg-zinc-900 text-gray-50'>
      <Header />
      {/* <RecordingPanel /> */}
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
