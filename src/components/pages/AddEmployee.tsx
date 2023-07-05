import { Container, Typography } from "@mui/material"
import AddUserForm from "../forms/AddUserForm";
import UserData from "../../model/UserData";
import { InputResult } from "../../model/InputResult";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import { useDispatch } from "react-redux";
import { codeActions } from "../../redux/slices/codeSlice";

const AddEmployee: React.FC = () => {
    const dispatch = useDispatch()
    const codeAlert: CodePayload = {code: CodeType.OK, message: ''}
    async function submitFn(data: Employee) {
        const res = await employeesService.addEmployee(data);
        if(typeof res === 'string'){
        if(res.includes('Authentification')){
            codeAlert.code = CodeType.AUTH_ERROR;
            codeAlert.message = 'Authentification error:' + res
        } else {
            codeAlert.code = CodeType.SERVER_ERROR
            codeAlert.message = "Server error: " + res
        }
           
    } else {
        codeAlert.message = `Emploee with id: ${res.id} added`
    
    }
    dispatch(codeActions.set(codeAlert))
    }


    return <Container>
        <Typography variant="h4" align="center">Add employee page</Typography>
        <AddUserForm submitFn={submitFn} empl={null}></AddUserForm>
    </Container>
}

export default AddEmployee;