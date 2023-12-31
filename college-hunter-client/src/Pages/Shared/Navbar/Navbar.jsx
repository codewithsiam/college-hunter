import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import useAdmin from '../../../Hooks/useAdmin';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logOut();
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/college" activeClassName="active">
          College
        </NavLink>
      </li>
      <li>
        <NavLink to="/admission" activeClassName="active">
          Admission
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/myCollege" activeClassName="active">
            My College
          </NavLink>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <NavLink to="/admin/addCollege" activeClassName="active">
            Admin Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link
          to="/"
          className="hidden md:block btn btn-ghost normal-case text-xl"
        >
          College Hunter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            {user?.photoURL && (
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className="font-semibold w-max mr-2 md:mr-5 text-sm lg:text-lg"
                >
                  {user?.displayName}
                </Link>
                <img
                  title={user?.displayName}
                  className="h-12 w-12 rounded-full border-2 border-primary"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            )}
            <button
              onClick={handleLogout}
              className="ml-3 md:ml-5 btn btn-primary text-white md:text-md text-xs"
            >
              Logout <FaSignOutAlt />
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
