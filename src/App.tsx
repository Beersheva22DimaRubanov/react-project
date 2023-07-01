import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignIn } from "./components/pages/SignIn"
import { SignOut } from "./components/pages/SignOut"
import './App.css'
import { useSelectorUser } from "./redux/store"
import { NotFound } from "./components/pages/NotFound"
import { NavigatorDispatcher } from "./components/navigators/NavigatorDispatcher"
import { RouteType } from "./components/navigators/Navigator"
import { useMemo } from "react"
import  UserData  from "./model/UserData"
import routesConfig from '../src/config/routes-config.json'
import Employees from "./components/pages/Employees"
import AddEmployee from "./components/pages/AddEmployee"
import AgeStatistics from "./components/pages/AgeStatistics"
import SalaryStatistics from "./components/pages/SalaryStatistics"
// type RouteTypeOrder = OrderTyp
const {always, authenticated, admin, noadmin, noauthenticated} = routesConfig;

function getRoutes(userData: UserData): RouteType[] {
    const res: RouteType[] = [];
    res.push(...always);
    if(userData){
        res.push(...authenticated);
        if(userData.role === 'admin'){
            res.push(...admin)
        } else{
            res.push(...noadmin)
        }
    } else{
        res.push(...noauthenticated)
    }
    // if(userData){
    //     res[res.length-1].name = userData.email
    // }
    return res.sort((r1, r2) => {
        let res = 0;
        if(r1.order && r2.order){
            res = r1.order - r2.order
        } 
        return res;
    });
  }

const App: React.FC = () => {
    const userData = useSelectorUser();
    const routes = useMemo(() => getRoutes(userData), [userData])

    return <BrowserRouter>
        <Routes>
            <Route path="/" element = {<NavigatorDispatcher routes={routes}/>}> 
                <Route index element = {<Employees/>}/>
                <Route path="employees/add" element = {<AddEmployee/>}/>
                <Route path ='statistics/age' element = {<AgeStatistics/>}/>
                <Route path="statistics/salary" element = {<SalaryStatistics/>}/>
                <Route path='signIn' element = {<SignIn/>}/>
                <Route path='signOut' element = {<SignOut/>}/>
                <Route path='/*' element = {<NotFound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}



export default App