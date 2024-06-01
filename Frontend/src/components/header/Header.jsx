import React from "react";
import './header.css'
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaCog, FaUsers,FaSearch } from 'react-icons/fa';

// const Header = () => {
export default function Header({ children }) {

    const menuItem = [
        {
            title: "Home",
            path: "/admin",
            icon: <FaHome size={15} />
        },
        {
            title: "Operation",
            path: "/admin/operation",
            icon: <FaCog size={15} />
        },
        {
            title: "Utilisateurs",
            path: "/admin/users",
            icon: <FaUsers size={15} />
        },
    ];

    return (
        <div className="kontena">
            <div className="sidebar">
                <h1 className="logo">Logo</h1>
                <div className="meny">
                <div className="nav">
                {menuItem.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className="link"
                                // activeClassName="active"  // Ajoutez cette ligne
                            >
                                <div className="link_title">
                                    {item.icon} {item.title}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="social_icon">
                    <h1 className="social">Fory</h1>
                </div>
            </div>
            {/* <main>{children}</main> */}
            <main><Outlet/></main>
        </div>
    )
}
// export default Header;

{/* <Link className="link_title">Coucou_1</Link>
<Link className="link_title" to="/admin/operation">Coucou_2</Link>
<Link className="link_title" to="/admin/users">Coucou_3</Link> */}