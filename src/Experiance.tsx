export interface IProps<T> {};
import { useThree } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import { BufferGeometry, Group, Line, LineBasicMaterial, Raycaster, Vector2, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'
import { pointsContext } from './App'

export const Experiance = <T extends object>(props: IProps<T> & { children?: any }) => {
    
    const { scene, camera } = useThree()
    
    useEffect(
        () => {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('./js/libs/draco/')
        
            const loader = new GLTFLoader().setPath('public/')
            loader.setDRACOLoader(dracoLoader)
        
            loader.load(
                'free_low_poly_game_assets.glb',
                (glb) => {
                    scene.add(glb.scene)
                }
            )
        }, []
    )

    // @ts-ignore
    const { point1, setPoint1, point2, setPoint2 } = useContext(pointsContext)

    // Need to use ref to create only one
    const linesGrouRef = useRef<Group | null>(null)
    const lineMaterialRef = useRef<LineBasicMaterial | null>(null)
    const lineGeometryRef = useRef<BufferGeometry | null>(null)

    if(!linesGrouRef.current){
        linesGrouRef.current = new Group()
        scene.add(linesGrouRef.current)
    
        lineMaterialRef.current = new LineBasicMaterial(
            {
                color: "red"
            }
        )
        lineGeometryRef.current = new BufferGeometry()
    }
    
    const getPoint = (event: MouseEvent ) => {
        const raycaster = new Raycaster()
        const pointer = new Vector2(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        )
        
        raycaster.setFromCamera(pointer, camera)

        const instances = raycaster.intersectObjects( scene.children )
        if (instances.length>0){
            const p = instances[0].point
            point1 ? ( point2 ? '' : setPoint2(p) ) : setPoint1(p)
        }
    }


    useEffect(
        ()=>{
            if(point1 && point2) {
                if(lineGeometryRef.current && lineMaterialRef.current){
                    lineGeometryRef.current.setFromPoints( [ point1, point2 ] )
                    const line = new Line(
                        lineGeometryRef.current, lineMaterialRef.current
                    )
                    linesGrouRef.current?.add(line)
                }
            }
            else{
                linesGrouRef.current?.clear()
            }
        }, [point1, point2]
    )

    useEffect(
        ()=>{
            window.addEventListener('click', getPoint)
            return ()=>{
                window.removeEventListener('click', getPoint)
            }
        }
    )

    return <>
    </>
}
