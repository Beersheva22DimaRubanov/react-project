import { useDispatch } from "react-redux"
import Input from "../common/Input";
import { InputResult } from "../../model/InputResult";
import { userActions } from "../../redux/slices/AuthSlice";
import AuthServiceJwt from "../../service/auth/AuthServiceJwt";
import { authService } from "../../config/service-config";
import  UserData  from "../../model/UserData";
import SignInForm from "../forms/SignInForm";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();

    async function setUser(data: {email: string, password: string}): Promise<InputResult>{
        let inputResult: InputResult = {status: 'error',
        message: "Server unavailable, repeat later on"}
        
       try {
           const res: UserData = await authService.login(data);
           res && dispatch(userActions.setUser(res));
           inputResult = {status: res ? 'success' : 'error',
           message: res ? '' : 'Incorrect Credentials'}
           
       } catch (error) {
           
       }
       return inputResult;
    }

    return <SignInForm submitFn={setUser} networks={authService.getAvailableProvider()}></SignInForm>
}

