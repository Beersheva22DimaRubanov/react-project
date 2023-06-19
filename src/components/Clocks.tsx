import { useState, useEffect, ReactNode } from "react"
import Clock from "./Clock"
import timeZones, { timeZone } from "./time-zones"
import Input from "./common/Input"
import { InputResult } from "../model/InputResult"


const Clocks: React.FC = ()=>{
    const [time, setTime] = useState<Date>(new Date())
    

    useEffect(() => {
        console.log('mounting of Clocks')
        const intervalId = setInterval(() => {
                setTime(new Date())
                console.log('interval')
        }, 1000)
        return ()=> {console.log('unmounting of clocks')
            clearInterval(intervalId);
        }
    }, []);

    const country:string[] = ["Belarus", "Moscow"];

    return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: 'space-around'}}>
        {country.map(el => {
            return <div>
                 <Clock key={el} time={time} place ={el}></Clock>
        </div>

        })}
          
    </div>  )


}

export default Clocks