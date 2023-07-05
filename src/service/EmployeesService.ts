import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeesService{
    addEmployee(empl: Employee): Promise<Employee | string>
    getEmployees(): Observable<Employee[] | string>
    deleteEmployee(id: any): Promise<void | string>
    updateEmployee(id: any, empl: Employee): Promise<Employee | string>
}