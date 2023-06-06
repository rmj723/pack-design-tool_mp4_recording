/* eslint-disable jsx-a11y/alt-text */
import { Canvas, CanvasTextureProps } from '@react-three/fiber'
import { Preload, Environment, Image, OrbitControls, SpotLight } from '@react-three/drei'
import PostProcessing from './PostProcessing'
import { Bloom } from '@react-three/postprocessing'
import { useWindowSize } from 'react-use'

export default function Scene({ children, className, ...props }: { children: JSX.Element[] } & CanvasTextureProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  const { height, width } = useWindowSize()

  return (
    <Canvas {...props}>
      {/* <Environment preset='studio' /> */}
      <Environment preset='night' />
      <spotLight position={[0, 50, 100]} angle={1} penumbra={1} intensity={1} />
      <color attach='background' args={['#000']} />
      {/* <Stars radius={100} depth={100} count={5000} factor={12} saturation={0} fade speed={1} /> */}
      {/* @ts-ignore */}

      {/* @ts-ignore */}
      <Image url={`/registerimage2.png`} position={[10, 5, -45]} scale={[100, 30]} />
      {children}
      <Preload all />
      {/* <Perf position='top-left' /> */}
      <PostProcessing>
        <Bloom
          intensity={3.0}
          mipmapBlur
          luminanceThreshold={1}
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
      </PostProcessing>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
