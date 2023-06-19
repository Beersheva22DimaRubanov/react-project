import { useEffect, useRef, useState } from "react";
import { InputResult } from "../../model/InputResult";
import { Alert } from "./Alert";
import { StatusType } from "../../model/StatusType";

type Props = {
    submitFn: (inputText: string) => InputResult;
    placeholder: string;
    buttonTitle?: string;
    type?: string
}
const Input: React.FC<Props> = ({ submitFn, placeholder, buttonTitle, type }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('')
    const status = useRef<StatusType>("error")

    function onChanged() {
        setDisabled(!inputelementRef.current?.value)
    }

    const inputelementRef = useRef<HTMLInputElement>(null)
    function onClickFunction() {
        const res = submitFn(inputelementRef.current!.value);
        setMessage (res.message || '')
        status.current = res.status;
        if(res.status === 'success'){
            inputelementRef.current!.value = ''
        }
        res.message && setTimeout(() => setMessage(''), 5000)
    }
    return <div>
        <input type={type ?? 'text'} placeholder={placeholder} ref={inputelementRef} onChange={onChanged} />
        <button onClick={onClickFunction} disabled={disabled}>{buttonTitle || 'GO'}</button>
        {message && <Alert status={status.current} message={message}></Alert>}
    </div>
}

export default Input;