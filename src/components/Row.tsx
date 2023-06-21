import { ReactNode, useEffect, useState } from "react"
import configLive from '../config/life-game-config.json'

function getSize(){
    return Math.min(window.innerHeight, window.innerWidth)/ + configLive.dimension -2 
}

const Row: React.FC<{ row: number[] }> = ({ row }) => {
    const [size, setSize] = useState(getSize())
    useEffect(() => {
        window.addEventListener('resize', () => setSize(getSize()))  
        // return ()=> window.removeEventListener('resize', setSize6)
    }, [])
    function getDivs(): ReactNode {
        return row.map((num, index) =>
            <div key={index} style={{
                width: size, height: size, backgroundColor: num ? 'black' : 'white', border: '1px solid grey'
            }}></div>
        )
    }
    return <section style={{ display: 'flex' }}>
        {getDivs()}
    </section>
}

export default Row;