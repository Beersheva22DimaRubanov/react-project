import { useState, useRef, useEffect } from "react"
import LiveMatrix from "../service/LiveMatrix"
import { Matrix } from "./Matrix"
import { getRandomMatrix } from "../util/random"
import lifeConfig from '../config/life-game-config.json'

const{dimension, tick} = lifeConfig;

export const LifeGames: React.FC = () => {
    const liveMatrix = useRef<LiveMatrix>()
    const [numbers, setNumbers] = useState<number[][]>([])
    function tickFunction(): void {
        if (!liveMatrix.current) {
            liveMatrix.current = new LiveMatrix(getRandomMatrix(dimension, dimension, 0, 2))
            setNumbers(liveMatrix.current.numbers)
        } else{
            setNumbers(liveMatrix.current.next())
        } 
    }

    useEffect(() => {
        const intervalId = setInterval(tickFunction, tick )
        return ()=> clearInterval(intervalId);
        })

    return <Matrix matrix={numbers} />
}


