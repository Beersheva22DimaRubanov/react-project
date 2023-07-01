import { Container, Typography } from "@mui/material"
import AddUserForm from "../forms/AddUserForm";
import UserData from "../../model/UserData";
import { InputResult } from "../../model/InputResult";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";

const AddEmployee: React.FC = ()=> {
    async function submitFn (data: Employee): Promise<InputResult>{
        const res = employeesService.addEmployee(data);
        return {status: await res? 'success': 'error', message: await res? "User added": 'Some problem please try latter' }
    }
    return <Container>
    
    <Typography variant="h4" align="center">Add employee page</Typography>
    <AddUserForm submitFn={submitFn}></AddUserForm>
    </Container>
}

export default AddEmployee;