import { Modal, Box, Typography } from "@mui/material"
import Employee from "../model/Employee";
import { useState } from "react";
import { employeesService } from "../config/service-config";
import { InputResult } from "../model/InputResult";
import { AddUserForm } from "./forms/AddUserForm";

type Props = {
    open: boolean,
    submitFn(data: Employee): Promise<InputResult>,
    handleClose(): void,
    employee: Employee
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateEmployee: React.FC<Props> = ({ open, handleClose,employee, submitFn }) => {

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <AddUserForm submitFn={submitFn} employeeUpdated={employee} />
        </Box>
    </Modal>;
} 

export default UpdateEmployee;