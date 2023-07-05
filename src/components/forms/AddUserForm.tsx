import { Alert, Box, Button, Container, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material"
import { InputResult } from "../../model/InputResult"
import employeeConfig from "../../config/employee-config.json"
import { useState } from "react"
import Employee from "../../model/Employee"
import React from "react"
import { StatusType } from "../../model/StatusType"
import CodePayload from "../../model/CodePayload"

type props = {
    submitFn: (data: Employee) => void
    empl: Employee| null
}
const SALARY_ERR_MESSAGE = `Enter salary in range: ${employeeConfig.minSalary} - ${employeeConfig.maxSalary}`
const BIRTH_DATE_ERR_MESSAGE = `Enter year in range: ${employeeConfig.minYear} - ${employeeConfig.maxYear}`
const FORM_ERR_MESSAGE = 'All fields should be filled'
const AddUserForm: React.FC<props> = ({ submitFn, empl }) => {
    const [department, setDepartment] = useState('');
    const [salaryError, setsalaryError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [open, setOpen] = useState(false)
    const errMessage = React.useRef('')
    const dateErrMessage = React.useRef('')
    const shownMessage = React.useRef<string>('')
    const severity = React.useRef<StatusType>('success')

    const handleChange = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const employeeName: string = data.get('employeeName')! as string;
        const birthYear: number = empl? empl.birthYear: +(data.get('birthDate')! as string);
        const salary: string = data.get('salary')! as string;
        const department: string = data.get('department')! as string;
        const gender: 'male' | 'female' = empl? empl.gender: data.get('gender')?.toString() as 'male' | 'female';
        const isFormReady: boolean = checkForm(employeeName, birthYear, +salary, department, gender);
        if (isFormReady) {
            const res = submitFn({ birthYear, department, gender, name: employeeName, salary: +salary * 1000 })
            data.delete('employeeName')
            event.target.reset()
        } else {
            setOpen(true)
            shownMessage.current = FORM_ERR_MESSAGE!;
            severity.current = 'error';

        }
    }

    function checkForm(name: string, birthDate: number, salary: number, department: string, gender: 'male' | 'female') {
        let res = true;
        console.log(empl)
        if (!name || !birthDate || !salary || !department || !gender) {
            res = false;
        } else if (birthDateError) {
            res = false
        } else if (salaryError) {
            res = false
        }
        return res;
    }

    function setMenuItems() {
        return employeeConfig.departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)
    }

    function handleSalary(event: any) {
        if (+event.target.value > employeeConfig.maxSalary || +event.target.value < employeeConfig.minSalary) {
            setsalaryError(true);
            errMessage.current = SALARY_ERR_MESSAGE;
        } else {
            setsalaryError(false);
            errMessage.current = '';
        }
    }

    function handleDateBirth(event: any) {
        if (+event.target.value > employeeConfig.maxYear || +event.target.value < employeeConfig.minYear) {
            setBirthDateError(true);
            dateErrMessage.current = BIRTH_DATE_ERR_MESSAGE;
        } else {
            setBirthDateError(false);
            dateErrMessage.current = '';
        }
    }

    return <Container component="main">
        <Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Grid container spacing={2} columns = {{xs :4, sm: 4, md: 8}} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={4} mb={3}>
                        <TextField
                            id="outlined-disabled"
                            defaultValue={empl?.name}
                            fullWidth
                            placeholder="Employee name"
                            name="employeeName"
                            required
                        />
                    </Grid>
                     <Grid item xs={4} mb={3}>
                        <TextField
                            id="outlined-disabled"
                            label="Birth date"
                            defaultValue={empl?.birthYear}
                            value={empl?.birthYear}
                            name='birthDate'
                            placeholder="yyyy"
                            disabled = {empl? true: false}
                            required
                            fullWidth
                            onBlur={handleDateBirth}
                            error={birthDateError}
                            helperText={dateErrMessage.current}
                        />
                    </Grid>
                    <Grid item xs={4} mb={3}>
                            <TextField
                                label="Salary"
                                name='salary'
                                placeholder="Salary"
                                type="number"
                                defaultValue={empl? empl.salary/1000: ''}
                                fullWidth
                                onBlur={handleSalary}
                                error={salaryError}
                                helperText={errMessage.current}
                            />
                    </Grid>
                    <Grid item xs={4} mb={3}>

                        <Select
                            id="demo-simple-select"
                            // value={department}
                            defaultValue= {empl? empl.department: "Departments"}
                            displayEmpty
                            fullWidth
                            onChange={handleChange}
                            name='department'
                        >
                            <MenuItem value="">
                                <em>Departments</em>
                            </MenuItem>
                            {setMenuItems()}
                        </Select>

                    </Grid>
                </Grid>
               { <Box>
                <InputLabel id="demo-radio-buttons-group-label" >Gender</InputLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    value = {empl?.gender}
                    
                >
                    <FormControlLabel value="female" control={<Radio />} disabled = {empl? true: false} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} disabled = {empl? true: false} label="Male" />
                </RadioGroup>
                </Box>}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
        <Snackbar open={open} transitionDuration={1000} onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={severity.current}>{shownMessage.current}</Alert>
        </Snackbar>
    </Container>
}

export default AddUserForm;