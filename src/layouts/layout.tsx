import React from 'react';
import { Outlet } from 'react-router-dom';
import Map from '../components/map/map';

function Layout() {
    return (
        <div className="main-container">
            <div className="main-container__map">
                <Map />
            </div>
            <div className="main-container__form form-container">
                <Outlet />
                <div className="form-container__footer">
                    <div className="form-container__footer-content">
                        React test - John Doe
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Layout;