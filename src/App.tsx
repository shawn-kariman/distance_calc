import './App.css'

import { Canvas } from '@react-three/fiber'
import { Experiance } from './Experiance'
import { OrbitControls } from '@react-three/drei'
import { createContext, useState } from 'react'
import { Vector3 } from 'three'

export const pointsContext = createContext<object | undefined>(undefined)

function App() {

  const [point1, setPoint1] = useState<Vector3 | null>(null)
  const [point2, setPoint2] = useState<Vector3 | null>(null)
  
  const handleNewLine = ()=>{
    setPoint1(null)
    setPoint2(null)
  }

  const uiDivStyle: object = {
    position: 'absolute',
    top:'9px',
    left:'9px',
    zIndex: 12,
    display: 'flex',
    justifyContent: "flex-start"
  }

  return (
    <>
    <pointsContext.Provider value={{ point1, setPoint1, point2, setPoint2 }} >
      <div style={uiDivStyle} >
        <button onClick={handleNewLine} >Reset</button>
        <p style={{ marginLeft: '18px' }} >
          {
            point1? (point2? point1.distanceTo(point2) : 0) : 0
          } Units
        </p>
      </div>
      <Canvas
        camera={{ position: [-3, 17, 24] }}
       >
        <OrbitControls />
        <Experiance />
      </Canvas>
    </pointsContext.Provider>
    </>
  )
}

export default App
