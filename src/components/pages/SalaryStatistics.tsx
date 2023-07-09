import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Employee from "../../model/Employee"
import CodePayload from "../../model/CodePayload"
import CodeType from "../../model/CodeType"
import { employeesService } from "../../config/service-config"
import { useDispatch } from "react-redux"
import { codeActions } from "../../redux/slices/codeSlice"
import Statistics from "../Statistics"

const SalaryStatistics: React.FC = ()=> {
    const [employees, setEmploees] = useState<Employee[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        const subscribstion = employeesService.getEmployees().subscribe({
           next (response: Employee[] | string){
            let codeAlert: CodePayload = {code: CodeType.OK, message: ''}
            if(typeof response === 'string'){
                if(response.includes('Authentication')){
                    codeAlert.code = CodeType.AUTH_ERROR;
                    codeAlert.message = 'Authentication error ' + response; 
                    dispatch(codeActions.set(codeAlert))
                } else{
                    codeAlert.code = CodeType.SERVER_ERROR
                    codeAlert.message = 'Server error ' + response;
                    dispatch(codeActions.set(codeAlert))
                }
            } else{
                codeAlert.message = 'Emploees data uploaded';
                dispatch(codeActions.set(codeAlert));
                setEmploees(response);
            }
           }
        })
        return () => subscribstion.unsubscribe();
    }, [])

    return <Container>
    <Typography variant="h4" align="center">Salary Statistics page</Typography>
    <Statistics defaultInterval={1000} employees={employees} field="salary"></Statistics>
    </Container>
}

export default SalaryStatistics