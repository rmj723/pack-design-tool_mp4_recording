import { useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { isMobile } from 'react-device-detect'

const Floor = () => {
  const normalMap = useLoader(TextureLoader, '/textures/ICY_Normal.png')
  const texture = useTexture('/textures/diffuse.jpeg')

  return (
    <mesh name={'floor'} rotation={[-Math.PI / 1.99, 0, 0]} position={[0, isMobile ? -2 : -1.65, -1]}>
      <planeGeometry args={[100, 50]} />

      {/* <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={0.9}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color='#848484'
        distortion={-0.1}
        distortionMap={texture}
        metalness={0}
        normalMap={normalMap}
        opacity={1}
      /> */}
      <MeshReflectorMaterial
        blur={[1000, 200]}
        resolution={1024}
        mixBlur={1}
        mixStrength={60}
        roughness={1}
        depthScale={1.4}
        minDepthThreshold={0.14}
        maxDepthThreshold={1.4}
        color='#0B0C12'
        metalness={0.5}
        distortion={-0.1}
        distortionMap={texture}
        mirror={0.5}
        normalMap={normalMap}
      />
    </mesh>
  )
}

export default Floor
