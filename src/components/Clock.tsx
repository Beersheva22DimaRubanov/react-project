import { time } from "console";
import { CSSProperties, useMemo } from "react"
import timeZones from "./time-zones";
type Props = {
    time: Date,
    place: string
}

const Clock: React.FC<Props> = ({ time, place }) => {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: "column", alignItems: "center"
    };

    const timeZoneObj: string|undefined = useMemo(() => getTimeZone(place), [place])
    const title: string = (timeZoneObj && place) || 'Israel'

    return <div style={style}>
        <header>
            Time in {title}
        </header>
        <p>{time.toLocaleTimeString(undefined, { timeZone: timeZoneObj })}</p>
    </div>
}

function getTimeZone(name: string) {
    // let places: timeZone[] = [];
    let res: string = '';
    timeZones.forEach(el => {
        if (JSON.stringify(el).toLowerCase().includes(name.toLowerCase())) {
            res = el?.name;
        }

    })
    // const res = places.map(el => {
    //     el = el.name
    // })
    return res;
}

export default Clock;