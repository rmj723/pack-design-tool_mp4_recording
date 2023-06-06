import { useMemo } from 'react'
import { EffectComposer, SMAA } from '@react-three/postprocessing'
import { useThree } from '@react-three/fiber'
export default function PostProcessing({ children }: { children: React.ReactNode }) {
  const { gl, viewport } = useThree()

  const isWebgl2 = useMemo(() => gl.capabilities.isWebGL2, [gl])
  const dpr = useMemo(() => viewport.dpr, [viewport])
  // @ts-ignore
  const maxSamples = useMemo(() => gl.capabilities.maxSamples, [gl])
  const needsAntialias = useMemo(() => dpr < 2, [dpr])

  return (
    <EffectComposer multisampling={isWebgl2 && needsAntialias ? maxSamples : 0}>
      <>
        {children}
        {!isWebgl2 && needsAntialias && <SMAA />}
      </>
    </EffectComposer>
  )
}
