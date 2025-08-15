//Main layout
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = () => {
    return (
        <div className='layout'>
            <header><Header className='header' /></header>
            <nav><NavBar className='nav' /></nav>
            <main>
                <Outlet />
            </main>
            <aside><Sidebar className='sidebar' /></aside>
            <footer><Footer className='footer' /></footer>
        </div>
    );
};

export default Layout;