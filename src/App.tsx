import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./components/pages/Home"
import { Orders } from "./components/pages/Orders"
import { Customers } from "./components/pages/Customers"
import { Products } from "./components/pages/Products"
import { ShoppingCart } from "./components/pages/ShoppingCart"
import { SignIn } from "./components/pages/SignIn"
import { SignOut } from "./components/pages/SignOut"
import { Navigator } from "./components/navigators/Navigator"
import './App.css'
import { useSelectorUser } from "./redux/store"
import navigatorConfig from  './config/Navigator.json'
import { NotFound } from "./components/pages/NotFound"
const App: React.FC = () => {
    const user = useSelectorUser();
    
        const navItems = navigatorConfig[user];

    return <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Navigator items={navItems}/>}> 
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