import { useDispatch } from "react-redux"
import Input from "../common/Input";
import { InputResult } from "../../model/InputResult";
import { userActions } from "../../redux/slices/AuthSlice";
import { SignInForm } from "../forms/SignInForm";
import AuthServiceJwt from "../../service/AuthServiceJwt";
import { authService } from "../../config/service-config";
import  UserData  from "../../model/UserData";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();

    async function setUser(data: {email: string, password: string}): Promise<InputResult>{
        const res: UserData = await authService.login(data);
        res && dispatch(userActions.setUser(res))
        return {status: res ? "success" : "error", message: res? "" : "Incorrect Credentials"}
    }

    return <SignInForm setUser={setUser}></SignInForm>
}

