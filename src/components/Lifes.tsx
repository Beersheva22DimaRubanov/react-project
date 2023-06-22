import { useDispatch } from "react-redux";
import { useSelectorCount, useSelectorDirection } from "../redux/store"
import { countActions } from "../redux/slices/lifeCountSlice";
import { useEffect } from "react";
import { LifeGames } from "./LiveGame";
import Input from "./common/Input";
import { InputResult } from "../model/InputResult";



export const Lifes: React.FC = () => {
    const lifesArr: number[] = [5];
    const dispatch = useDispatch()
    function showLifes(inputLifes: string): InputResult{
        dispatch(countActions.setCount(+inputLifes))
    return {status: 'error'}
        
    }

    useEffect(() => {
        dispatch(countActions.setCount(0))
    }, [])
    const direction = useSelectorDirection();
    const count = useSelectorCount()
    {console.log(count)}
    return <section style={{ display: 'flex', flexDirection: direction, alignItems: 'center', justifyContent: 'space-around' }}>
        
        {count == 0? <Input placeholder="number of lives" submitFn={showLifes} ></Input> : 
        Array.from({length: count}).map(_ => <LifeGames/>)}
    </section>

}