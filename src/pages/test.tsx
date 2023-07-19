import RecordingPanel from "@/components/dom/RecordingPanel"
import { Canvas } from "@react-three/fiber"

export const Test = ()=>{
    return (
        <div>
            <RecordingPanel/>
            <Canvas>
                <mesh>
                    <boxGeometry/>
                </mesh>
            </Canvas>
        </div>
    )
}