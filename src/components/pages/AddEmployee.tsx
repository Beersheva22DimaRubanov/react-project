import { Container, Typography } from "@mui/material"
import {EmployeeForm} from "../forms/AddUserForm";
import UserData from "../../model/UserData";
import { InputResult } from "../../model/InputResult";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import { useDispatch } from "react-redux";
import { codeActions } from "../../redux/slices/codeSlice";
import { useDispatchCode } from "../../config/hooks/hooks";

const AddEmployee: React.FC = () => {
    const dispatch = useDispatchCode()
    let successMessage: string = '';
        let errorMessage = '';
    const codeAlert: CodePayload = {code: CodeType.OK, message: ''}

    async function submitFn(empl: Employee): Promise<InputResult> {
        const res: InputResult = {status: 'success', message: ''};
        try {
            const employee: Employee = await employeesService.addEmployee(empl);
            successMessage = `employee with id: ${employee.id} has been added`
        } catch (error: any) {
           errorMessage = error;
        }
        dispatch(errorMessage, successMessage);
        return res;
    }

    return <Container>
        <Typography variant="h4" align="center">Add employee page</Typography>
        <EmployeeForm submitFn={submitFn}></EmployeeForm>
    </Container>
}

export default AddEmployee;