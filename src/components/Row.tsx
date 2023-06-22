import { ReactNode, useEffect, useState } from "react"
import configLive from '../config/life-game-config.json'
import { useSelectorCount, useSelectorSize } from "../redux/store"

function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / + configLive.dimension - 2
}

const Row: React.FC<{ row: number[] }> = ({ row }) => {
    const size = useSelectorSize()
    const count = useSelectorCount()

    function getDivs(): ReactNode {
        return row.map((num, index) =>
            <div key={index} style={{
                width: size/count, height: size/count, backgroundColor: num ? 'black' : 'white', border: '1px solid grey'
            }}></div>
        )
    }
    return <section style={{ display: 'flex' }}>
        {getDivs()}
    </section>
}

export default Row;