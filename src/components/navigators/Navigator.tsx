import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

type Props =
    { to: string, name: string }


export const Navigator: React.FC<{ items: Props[] }> = ({ items }) => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        let index = items.findIndex(r => r.to === location.pathname);
        if(index < 0){
            index = 0;
        }
        navigate(items[index].to)
    }, [items])
    return <div>
        <nav>
            <ul className="navigator-list">
                {items.map(item => {
                    return (<li className="navigator-item">
                        <NavLink to={item.to}>{item.name}</NavLink>
                    </li>)
                })}
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>
}