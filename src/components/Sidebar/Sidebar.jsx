//Community sidebar with submeddits
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    //Array
    const submeddits = ['Mario', 'EverythingPeach', 'Rosalina', 'Toad', 'bowser', 'donkeykong'];
    //Shuffles the array 
    const shuffled = [...submeddits].sort(() => 0.5 - Math.random());
    const randomSubmeddits = shuffled.slice(0, 4);

    return (
        <aside className='sidebar'>
            <h2>Popular Submeddits</h2>
            <ul className='side-links'>
                {randomSubmeddits.slice(0, 4).map(name => (
                    <li key={name}>
                        <Link to={`/r/${name}`}>r/{name}</Link>
                    </li>
                ))}
                
            </ul>
            <p className='see-more'>
                    <Link to='/submeddit'>See More</Link>
            </p>
        </aside>
    );
};

export default Sidebar;