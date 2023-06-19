import { CSSProperties } from "react"
import { StatusType } from "../../model/StatusType";

type Props = {
    status: StatusType;
    message: string
}

const statusMap: Map<StatusType, CSSProperties> = new Map([
["error", {backgroundColor: "red"}],
["warning", {backgroundColor: "yellow"}],
["success", {backgroundColor: "lightgreen"}]
])

export const Alert: React.FC<Props> = ({status, message}) =>{
    return <div>
         <p style={statusMap.get(status)}>{message}</p>
        </div>
}