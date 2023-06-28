import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./components/pages/Home"
import { Orders } from "./components/pages/Orders"
import { Customers } from "./components/pages/Customers"
import { Products } from "./components/pages/Products"
import { ShoppingCart } from "./components/pages/ShoppingCart"
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
const {always, authenticated, admin, noadmin, noauthenticated} = routesConfig;

function getRoutes(userdata: UserData): RouteType[] {
    const res: RouteType[] = [];
    res.push(...always);
    if(userdata){
        res.push(...authenticated);
        if(userdata.role === 'admin'){
            res.push(...admin)
        } else{
            res.push(...noadmin)
        }
    } else{
        res.push(...noauthenticated)
    }
    return res;
  }

const App: React.FC = () => {
    const userData = useSelectorUser();
    const routes = useMemo(() => getRoutes(userData), [userData])

    return <BrowserRouter>
        <Routes>
            <Route path="/" element = {<NavigatorDispatcher routes={routes}/>}> 
                <Route index element = {<Home/>}/>
                <Route path="orders" element = {<Orders/>}/>
                <Route path ='customers' element = {<Customers/>}/>
                <Route path="products" element = {<Products/>}/>
                <Route path='shoppingCart' element = {<ShoppingCart/>}/>
                <Route path='signIn' element = {<SignIn/>}/>
                <Route path='signOut' element = {<SignOut/>}/>
                <Route path='/*' element = {<NotFound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}



export default App