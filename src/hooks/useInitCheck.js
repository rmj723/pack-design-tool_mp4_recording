import gsap from 'gsap'
import useStore from '@/lib/store'
import { useEffect } from 'react'

const useInitCheck = (ref, title, state, isHome) => {
  useEffect(() => {
    if (!isHome) {
      useStore.setState({ activeProject: title })
      useStore.setState({ activeObject: false })
      useStore.setState({ activeCharacter: ref.current })
    }
  }, [state])

  useEffect(() => {
    if (useStore.getState().activeProject === title) {
      // gsap.set(shaderRef.current.material.uniforms.uOpacity, {
      //   value: 0
      // })

      return
    }

    // gsap.to(shaderRef.current.material.uniforms.uOpacity, {
    //   duration: 1 / 3,
    //   value: 0,
    //   ease: 'power2.out'
    // })

    return () => {
      useStore.setState({ hoverProject: false })
    }
  }, [])
}

export default useInitCheck
