import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../Pages/Shared/Navbar/DashboardNav';

const DashboardLayout = () => {


    return (
        <div className="flex relative">
            <div className='h-screen sticky top-0'>

                <DashboardNav></DashboardNav>
            </div>
            <div className="h-full flex-1 p-7">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;


