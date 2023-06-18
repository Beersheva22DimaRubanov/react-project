import { useState, useEffect, ReactNode } from "react"
import Clock from "./Clock"
import timeZones, { timeZone } from "./time-zones"


const Clocks: React.FC = ()=>{
    const [time, setTime] = useState<Date>(new Date())
    

    useEffect(() => {
        const intervalId = setInterval(() => {
                setTime(new Date())
        }, 1000)
        return ()=> clearInterval(intervalId);
    }, []);

    const country:string[] = ["belarus", "england"];

    // const clocks: ReactNode = country.map(el => {
    //     <Clock key={el} time={time} place ={el}></Clock>
    //    })
   
    return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: 'center'}}>
          <Clock time={time} place ={'Belarus'}></Clock>
    </div>  )


}

export default Clocks