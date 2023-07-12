import AuthService from "../service/auth/AuthService";
import AuthServiceFake from "../service/auth/AuthServiceFake";
import AuthServiceFire from "../service/auth/AuthServiceFire";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";
import EmployeesServiceFire from "../service/crud/EmployeeServiceFire";
import EmployeesService from "../service/crud/EmployeesService";

export const authService: AuthService = new AuthServiceFire()

export const employeesService: EmployeesService = new EmployeesServiceFire()