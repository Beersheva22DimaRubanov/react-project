import { Container, Typography } from "@mui/material"
import { InputResult } from "../../model/InputResult";
import { employeesService } from "../../config/service-config";
import { AddUserForm } from "../forms/AddUserForm";
import { useDispatchCode } from "../../config/hooks/hooks";
import Employee from "../../model/Employee";

const AddEmployee: React.FC = () => {
    let successMessage: string = '';
    let errorMessage = '';
    const dispatch = useDispatchCode();
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
        {/* <AddUserForm submitFn={submitFn} empl={null}></AddUserForm> */}
       <AddUserForm  submitFn={submitFn}></AddUserForm>
    </Container>
}

export default AddEmployee;