import { employeesService } from "../../config/service-config";
import { InputResult } from "../../model/InputResult";
import { getRandomEmployee } from "../../util/random";
import Input from "../common/Input";
import employeeConfig from "../../config/employee-config.json"
import Employee from "../../model/Employee";

const GenerationPage: React.FC = () => {
    function submitFn(amount: string): InputResult{
        for(let i = 0; i<= +amount; i++ ){
            let employee = getRandomEmployee(employeeConfig.minSalary, employeeConfig.maxSalary, employeeConfig.minYear, employeeConfig.maxYear, employeeConfig.departments)
            employeesService.addEmployee(employee)
        }
        return {status: 'success'}
    }

    return <Input placeholder="Employees amount" submitFn={submitFn}></Input>
}

export default GenerationPage;