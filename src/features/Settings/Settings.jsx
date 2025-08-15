//Make the settings usable
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Settings.css';

const Settings = () => {
    const [lightMode, setLightMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [nsfwFilter, setNsfwFilter] = useState(true);

    const handleLightModeToggle = () => setLightMode(!lightMode);
    const handleNotificationsToggle = () => setNotifications(!notifications);
    const handleNsfwToggle = () => setNsfwFilter(!nsfwFilter);

    return (
        <>
            <Header />
            <div className='settings-container'>
                <h1>Settings</h1>

                <div className='settings-option'>
                    <label htmlFor='lightMode'>Light Mode</label>
                    <input 
                        id='lightMode'
                        type='checkbox' 
                        checked={lightMode} 
                        onChange={handleLightModeToggle} 
                    />
                </div>

                <div className='settings-option'>
                    <label htmlFor='notifications'>Enable Notifications</label>
                        <input 
                            id='notifications'
                            type='checkbox' 
                            checked={notifications} 
                            onChange={handleNotificationsToggle} 
                        />
                </div>

                <div className='settings-option'>
                    <label htmlFor='nsfw'>Filter NSFW Content</label>
                        <input 
                            id='nsfw'
                            type='checkbox' 
                            checked={nsfwFilter} 
                            onChange={handleNsfwToggle} 
                        />
                </div>
            </div>
        </>
    );
};

export default Settings;