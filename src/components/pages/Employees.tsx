import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Employee from "../../model/Employee"
import { authService, employeesService } from "../../config/service-config"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useDispatch } from "react-redux"
import { userActions } from "../../redux/slices/AuthSlice"
import { StatusType } from "../../model/StatusType"
import { useSelectorUser } from "../../redux/store"
import UserData from "../../model/UserData"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Confirm from "../common/Confirm"
import UpdateEmployee from "../UpdateEmployee"
import { InputResult } from "../../model/InputResult"
import CodeType from "../../model/CodeType"
import CodePayload from "../../model/CodePayload"
import { codeActions } from "../../redux/slices/codeSlice"

const Employees: React.FC = () => {
    const [open, setOpen] = useState(false);
    const[openModal, setOpenModal] = useState(false)
    const emplId = useRef(0);
    const currentEmpl = useRef<any>('');

    const dispatch = useDispatch()
    const [employees, setEmployees] = useState<Employee[]>([])
    const currentUser = useSelectorUser()

    function getColumns(currentUser: UserData) {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 0.5 },
            { field: 'name', headerName: 'Name', flex: 0.7 },
            { field: 'birthYear', headerName: 'Birth year', flex: 0.7 },
            { field: 'gender', headerName: 'Gender', flex: 0.6 },
            { field: 'department', headerName: 'Department', flex: 0.8 },
            { field: 'salary', headerName: 'Salary', flex: 0.6 }
        ]

        if (currentUser?.role === 'admin') {
            columns.push(
                {
                    field: 'actions', headerName: 'ACTIONS', type: 'actions',
                    getActions: (params: GridRowParams) => [
                        <GridActionsCellItem onClick={() => {
                            emplId.current = +params.id
                            setOpen(true)
                        }} icon={<DeleteIcon />} label="Delete" />,
                        <GridActionsCellItem onClick ={()=>{
                            const currentEmpl: Employee = params.row;
                            updateUser(currentEmpl)
                        }} icon={<EditIcon/>} label = 'Edit'/>
                    ]
                }
            )
        }
        return columns;
    }

    useEffect(() => {
        const subsciption = employeesService.getEmployees().subscribe({
            next(emplArray: Employee[] | string) {
                let codeAlert: CodePayload = {code: CodeType.OK, message: ''} 
                if (typeof emplArray === 'string') {
                    if (emplArray.includes('Authentication')) {
                        codeAlert.code = CodeType.AUTH_ERROR
                        codeAlert.message = "Authentication error " + emplArray;
                        dispatch(codeActions.set(codeAlert))

                    } else {
                        codeAlert.code = CodeType.SERVER_ERROR
                        codeAlert.message = "Server error " + emplArray;
                        dispatch(codeActions.set(codeAlert))
                    }

                } else {
                    codeAlert.message = "Data uploaded"
                    dispatch(codeActions.set(codeAlert))
                    setEmployees(emplArray)
                }
            }
        })
      
        return () => subsciption.unsubscribe()
    }, [])

    function updateUser(empl: Employee) {
        setOpenModal(true);
        currentEmpl.current = empl;
     }

     function handleCloseModal(){
        setOpenModal(false)
     }

     async function submitFn(data: Employee) {
        const codeAlert: CodePayload ={code: CodeType.OK, message: ''}
        handleCloseModal()
            const res = await employeesService.updateEmployee(currentEmpl.current.id, data)
            if(typeof res === 'string'){
            if(res.includes('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + res
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + res
            }
               
        } else {
            codeAlert.message = `Emploee with id: ${res.id} updated`
        
        }
        dispatch(codeActions.set(codeAlert))
    }
     
    async function closeConfirm(isAgree: boolean) {
        const codeAlert: CodePayload ={code: CodeType.OK, message: ''}
        setOpen(false)
        if (isAgree) {
           const res = await employeesService.deleteEmployee(emplId.current);
           if(typeof res === 'string'){
            if(res.includes ('Authentification')){
                codeAlert.code = CodeType.AUTH_ERROR;
                codeAlert.message = 'Authentification error:' + res
            } else {
                codeAlert.code = CodeType.SERVER_ERROR
                codeAlert.message = "Server error: " + res
            }
               
        } else {
            codeAlert.message = `Emploee with id: ${currentEmpl.current} deleted`
        
        }
        dispatch(codeActions.set(codeAlert))
        }
    }

    return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: '50vh', width: '80vw' }}>
            <DataGrid columns={getColumns(currentUser)} rows={employees} />
        </Box>
        <UpdateEmployee  open={openModal} handleClose={handleCloseModal} employee ={currentEmpl.current} submitFn={submitFn}></UpdateEmployee>
        <Confirm message={"Delete user with id " + emplId.current}    open={open} title="Delete" handleClose={closeConfirm}/>
    </Box>
}

export default Employees

