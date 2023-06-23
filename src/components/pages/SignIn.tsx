import { useDispatch } from "react-redux"
import Input from "../common/Input";
import { InputResult } from "../../model/InputResult";
import { userActions } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
     function setUser(userInput: string): InputResult{
        dispatch(userActions.setUser(userInput))
        navigate('/')
        return{status: 'error'}
    }

    return  <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>   
    <p className = 'component-logo'>Sign in component</p>
    <Input placeholder="input Username" submitFn={setUser}></Input>
    </div>
 

}

