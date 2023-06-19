import { time } from "console";
import { CSSProperties, useMemo, useState } from "react"
import timeZones, { timeZone } from "./time-zones";
import Input from "./common/Input";
import { InputResult } from "../model/InputResult";
import { StatusType } from "../model/StatusType";
type Props = {
    time: Date,
    place: string,
}

const Clock: React.FC<Props> = ({ time, place }) => {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: "column", alignItems: "center"
    };

    const [timeZone, setTimeZone] = useState(getTimeZone(place))
    const [title, setTitle] = useState(() => (timeZone && place) || 'Israel')

    return <div style={style}>
        <header>
            Time in {title}
        </header>
        <p>{time.toLocaleTimeString(undefined, { timeZone: timeZone[0] ?? 'Israel' })}</p>
        <Input submitFn={function (inputText: string): InputResult {
            console.log(inputText);
            let status: StatusType;
            let message;
            const inputTimeZone = getTimeZone(inputText);
            if (inputTimeZone.length == 0) {
                status = 'error'
                message = 'Wrong input'
            } else if (inputTimeZone.length > 1) {
                status = 'warning'
                message = "There are more than one value"
            } else {
                status = 'success'
                message = "Everything OK!"
                setTimeZone(inputTimeZone)
                setTitle(inputText);
            }
            return { status: status, message: message }
        }} placeholder={"Input country or city"} buttonTitle='GO' type="text" />
    </div>
}

function getTimeZone(name: string) {
    let places: string[] = [];
    timeZones.forEach(el => {
        if (JSON.stringify(el).toLowerCase().includes(name.toLowerCase())) {
            places.push(el.name)
        }

    })
    return places;
}

export default Clock;