import { Box, Container, Grid, Typography } from "@mui/material"
import { employeesService } from "../../config/service-config"
import { useEffect, useMemo, useState } from "react"
import Employee from "../../model/Employee"
import CodePayload from "../../model/CodePayload"
import CodeType from "../../model/CodeType"
import { useDispatch } from "react-redux"
import { codeActions } from "../../redux/slices/codeSlice"
import { count } from "../../util/number-functions"
import Statistics from "../Statistics"

const AgeStatistics: React.FC = () => {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        const subscription = employeesService.getEmployees().subscribe({
            next(response: Employee[] | string) {
                let codeAlert: CodePayload = { code: CodeType.OK, message: '' };
                if (typeof response == 'string') {
                    if (response.includes('Authentication')) {
                        codeAlert.code = CodeType.AUTH_ERROR;
                        codeAlert.message = 'Authentication error ' + response
                        dispatch(codeActions.set(codeAlert))
                    } else {
                        codeAlert.code = CodeType.SERVER_ERROR;
                        codeAlert.message = "Server error " + response;
                        dispatch(codeActions.set(codeAlert))
                    }
                } else {
                    codeAlert.message = 'Upload users';
                    dispatch(codeActions.set(codeAlert));
                    setEmployees(response);
                }
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    return <Container>
        <Typography variant="h4" align="center">Age Statistics page</Typography>
        {employees.length != 0 ? <Statistics employees={employees} defaultInterval={10} field="age"></Statistics> : ''}
    </Container>
}

export default AgeStatistics