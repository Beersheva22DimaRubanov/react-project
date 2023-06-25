import { useDispatch } from "react-redux"
import Input from "../common/Input";
import { InputResult } from "../../model/InputResult";
import { userActions } from "../../redux/slices/AuthSlice";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();
     function setUser(userInput: string): InputResult{
        dispatch(userActions.setUser(userInput))
        return{status: 'error'}
    }

    return  <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>   
    <p className = 'component-logo'>Sign in component</p>
    <Input placeholder="input Username" submitFn={setUser}></Input>
    </div>
 

}

