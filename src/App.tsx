import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignIn } from "./components/pages/SignIn"
import { SignOut } from "./components/pages/SignOut"
import './App.css'
import { useSelectorCode, useSelectorUser } from "./redux/store"
import { NotFound } from "./components/pages/NotFound"
import { NavigatorDispatcher } from "./components/navigators/NavigatorDispatcher"
import { RouteType } from "./components/navigators/Navigator"
import { useMemo, useState } from "react"
import  UserData  from "./model/UserData"
import routesConfig from '../src/config/routes-config.json'
import Employees from "./components/pages/Employees"
import AddEmployee from "./components/pages/AddEmployee"
import AgeStatistics from "./components/pages/AgeStatistics"
import SalaryStatistics from "./components/pages/SalaryStatistics"
import GenerationPage from "./components/pages/GenerationPage"
import CodePayload from "./model/CodePayload"
import CodeType from "./model/CodeType"
import { Snackbar, Alert } from "@mui/material"
import { StatusType } from "./model/StatusType"
import { authService } from "./config/service-config"
import { useDispatch } from "react-redux"
import { userActions } from "./redux/slices/AuthSlice"
import { codeActions } from "./redux/slices/codeSlice"
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
     res.sort((r1, r2) => {
        let res = 0;
        if(r1.order && r2.order){
            res = r1.order - r2.order
        } 
        return res;
    });
       if(userData){
        res[res.length-1].name = userData.email
    }
    return res;
  }

  

const App: React.FC = () => {
    const dispatch = useDispatch()
    const userData = useSelectorUser();
    const codeMessage: CodePayload = useSelectorCode()
    // const [message, setMessage] = useState('')
    const[alertMessage, severity] = useMemo(() => getSnackBarData(), [codeMessage])
    const routes = useMemo(() => getRoutes(userData), [userData])

    function getSnackBarData(){
        let res: [string, StatusType] = ['', 'error']
        res[1] = codeMessage.code === CodeType.OK ? 'success': 'error'
        res[0] = codeMessage.message;
        // setMessage(codeMessage.message)
        if(codeMessage.code === CodeType.AUTH_ERROR){
            authService.logout()
            dispatch(userActions.reset())
        }
        return res;
      }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element = {<NavigatorDispatcher routes={routes}/>}> 
                <Route index element = {<Employees/>}/>
                <Route path="employees/add" element = {<AddEmployee/>}/>
                <Route path ='statistics/age' element = {<AgeStatistics/>}/>
                <Route path="statistics/salary" element = {<SalaryStatistics/>}/>
                <Route path='signIn' element = {<SignIn/>}/>
                <Route path='signOut' element = {<SignOut/>}/>
                <Route path='employees/generation' element = {<GenerationPage/>}/>
                <Route path='/*' element = {<NotFound/>}/>
            </Route>
        </Routes>
        <Snackbar open={!!alertMessage}  autoHideDuration={3000} onClose={() =>  dispatch(codeActions.reset())}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={severity} >{alertMessage}</Alert>
         </Snackbar> 
    </BrowserRouter>
}



export default App