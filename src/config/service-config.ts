import AuthService from "../service/auth/AuthService";
import AuthServiceFake from "../service/auth/AuthServiceFake";
import AuthServiceFire from "../service/auth/AuthServiceFire";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";
import EmployeesServiceFire from "../service/crud/EmployeeServiceFire";
import EmployeesService from "../service/crud/EmployeesService";
import EmployeesServiceRest from "../service/crud/EmployeesServiceRest";

export const authService: AuthService = new AuthServiceJwt('http://localhost:8080/login')

export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:8080/employees')