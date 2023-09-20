import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import CodeType from "../../model/CodeType";
import Employee from "../../model/Employee";
import { codeActions } from "../../redux/slices/codeSlice";
import { employeesService } from "../service-config";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
        
        if (error.includes('Authentication')) {

            code = CodeType.AUTH_ERROR;
            message = "Authentication error, mooving to Sign In";
        } else {
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                CodeType.UNKNOWN;
            message = error;
        }
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}
export function useSelectorEmployees() {
    const dispatch = useDispatchCode();
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {

        const subscription: Subscription = employeesService.getEmployees()
            .subscribe({
                next(emplArray: Employee[] | string) {
                    let errorMessage: string = '';
                    if (typeof emplArray === 'string') {
                        errorMessage = emplArray;
                    } else {
                        setEmployees(emplArray.map(e => ({ ...e, birthDate: new Date(e.birthDate) })));
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return employees;
}
