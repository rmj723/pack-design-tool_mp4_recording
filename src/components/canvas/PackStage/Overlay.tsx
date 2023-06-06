import { useLayoutEffect, useRef } from 'react'
import useStore from '@/lib/store'
import gsap from 'gsap'

export function Overlay() {
  const router = useStore((state) => state.router)
  const packOpeningEnd = useStore((state) => state.packOpeningEnd)

  const overlayRef = useRef()

  useLayoutEffect(() => {
    if (packOpeningEnd && overlayRef.current) {
      //?  No idea why it doesn't work with a shader? Works in a test project
      //   gsap.to(overlayRef.current.material.uniforms.uOpacity, {
      //     value: 1,
      //     duration: 4,
      //     ease: 'Power4.Out',
      //   })
      // @ts-ignore
      const tween = gsap.to(overlayRef.current.material, {
        opacity: 1,
        duration: 0.015,
        ease: 'Power4.Out',
        onComplete: () => {
          router.push('/pack')
        },
      })
      return () => {
        tween.kill()
      }
    }
  }, [packOpeningEnd])

  return (
    <>
      {/* <mesh ref={overlayRef} position={[0, 0, 15]}>
        <planeGeometry args={[10, 10, 1, 1]} />
        <shaderMaterial
          transparent
          uniforms={{
            uOpacity: { value: 1 },
          }}
          vertexShader={`
            void main()
            {
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);

                vec4 viewPosition = viewMatrix * modelPosition;

                vec4 projectedPosition = projectionMatrix * viewPosition;

                gl_Position = projectedPosition;
            }
        `}
          fragmentShader={`
            uniform float uOpacity;

            void main()
            {
                gl_FragColor = vec4(0.0, 1.0, 0.0, uOpacity);
            }
        `}
        />
      </mesh> */}

      <mesh ref={overlayRef} position={[0, 0, 10]}>
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshBasicMaterial color={'black'} transparent opacity={0} />
      </mesh>
    </>
  )
}
