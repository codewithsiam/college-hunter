import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut();
    }
    const navItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link>Colleges</Link></li>
            <li><Link>Admission</Link></li>
            <li><Link>My College</Link></li>
        </>
    );
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                      {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">College Hunter</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {navItems}
                </ul>
            </div>
            <div className="navbar-end">
            {user ? (
                    <>
                        {user?.photoURL && (
                            <img title={user?.displayName}
                                className="h-12 w-12 rounded-full border-2 border-primary"
                                src={user?.photoURL}
                            />
                        )}
                        <button onClick={handleLogout} className="ml-3 md:ml-5 btn btn-primary text-white md:text-md text-xs">
                            Logout <FaSignOutAlt></FaSignOutAlt>
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary text-white">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;