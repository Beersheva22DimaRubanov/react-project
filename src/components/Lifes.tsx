import { useDispatch } from "react-redux";
import { useSelectorCount, useSelectorDirection } from "../redux/store"
import { countActions } from "../redux/slices/lifeCountSlice";
import { useEffect } from "react";
import { LifeGames } from "./LiveGame";
import Input from "./common/Input";
import { InputResult } from "../model/InputResult";



export const Lifes: React.FC<{ lifes: number }> = ({ lifes }) => {
    const lifesArr: number[] = [5];
    const dispatch = useDispatch()
    function showLifes(inputLifes: string): InputResult{
        lifes = +inputLifes;
        dispatch(countActions.setCount(+inputLifes))
    return {status: 'error'}
        
    }

    useEffect(() => {
        dispatch(countActions.setCount(0))
    }, [])
    const direction = useSelectorDirection();
    const count = useSelectorCount()
    return <section style={{ display: 'flex', flexDirection: direction, alignItems: 'center', justifyContent: 'space-around' }}>
        <Input placeholder="number of lives" submitFn={showLifes} ></Input>
        {Array.from({length: count}).map(_ => <LifeGames/>)}
    </section>

}