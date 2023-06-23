import { useDispatch } from "react-redux"
import { userActions } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export const SignOut: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return <div> 
        <p className = 'component-logo'>Sign out component</p>
        <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
            <p style={{fontSize: '2em'}}>Are yre want to sign out?</p>
            <button style={{padding: '1em 1.75em', fontSize: '1em'}} onClick={() =>{
                navigate('/') 
                dispatch(userActions.setUser(''))}}>Ok</button>
        </div>

</div>
}