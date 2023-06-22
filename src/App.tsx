import { useEffect } from "react"
import { LifeGames } from "./components/LiveGame"
import { useDispatch } from "react-redux"
import { sizeActions } from "./redux/slices/cellSizeSlice"
import { directionActions } from "./redux/slices/flexDirectionSlice"
import { Lifes } from "./components/Lifes"
import Input from "./components/common/Input"
import { InputResult } from "./model/InputResult"

const App: React.FC = () => {
    let lifes = 0;
    const dispatch = useDispatch<any>()
    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(sizeActions.setSize());
            dispatch(directionActions.setDirection())
        })
    }, [])
    return <div>
        <Lifes ></Lifes>
    </div>


}



export default App