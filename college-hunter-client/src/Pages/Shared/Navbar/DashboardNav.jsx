import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';


const DashboardNav = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();


    const navItems = (
        <>
            

            {/* for admin routes  */}

            {isAdmin && <>
                <li>
                    <NavLink
                        to="manageUsers"
                        className="text-white hover:bg-indigo-400 w-full rounded-lg px-4 py-2 mb-2 inline-block text-base leading-loose"
                    >
                        Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="addClass"
                        className="text-white hover:bg-indigo-400 w-full rounded-lg px-4 py-2 mb-2 inline-block text-base leading-loose"
                    >
                        Add Class
                    </NavLink>
                </li>
              
              
            </>
            }

<div className="divider"></div> 
            {/* for logged in students, instructor and admin  */}
              <li>
                    <NavLink
                        to="/"
                        className="text-white hover:bg-indigo-400 w-full rounded-lg px-4 py-2 mb-2 inline-block text-base leading-loose"
                    >
                       Go to  Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/allClasses"
                        className="text-white hover:bg-indigo-400 w-full rounded-lg px-4 py-2 mb-2 inline-block text-base leading-loose"
                    >
                     Classes
                    </NavLink>
                </li>
            
        </>
    );
    return (
        <div
            className="w-72 bg-dark-purple h-full p-5  pt-8 relative"
        >
            <div className="items-center">
                <h1
                    className={`text-white origin-left font-medium text-xl `}
                >
                    Hi, {user?.displayName}
                </h1>
                <ul className='mt-10'>
                    {navItems}
                </ul>
            </div>

        </div>
    );
};

export default DashboardNav;