import { NavLink, Outlet } from "react-router-dom"

type Props =
    { to: string, name: string }


export const Navigator: React.FC<{ items: Props[] }> = ({ items }) => {
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