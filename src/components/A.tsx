import { useEffect } from "react"

export const A: React.FC = () => {
    useEffect( ()=> {
        console.log('mounting of A');
        return () => console.log('unmounting of A')
    })
return <p style = {{fontSize: '2em', fontWeight: 'bold'}}>Component A</p>
}