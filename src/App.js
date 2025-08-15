//make sure to update with all paths
//ADD CREATE POST LINK

//Main
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import { useDispatch, useSelector } from 'react-redux';*/
/*import Loading from '../shared/utilities/LoadingSpinner';*/
import './App.css';

//Home&Layout
import Home from './features/Home/Home';
/*import Layout from '../shared/layout/Layout';*/

//Nav
import About from './features/About/About';
import Help from './features/Help/Help';
import Settings from './features/Settings/Settings';

//Features
import Post from '../src/features/Post/Post';
/*import SearchResults from '../features/search/SearchResults';*/
import Submeddits from '../src/features/Submeddits/Submeddits';
import User from '../src/features/User/User';


function App() {
    /*const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.error.message);
    const globalLoading = useSelector((state) => state.ui.globalLoading);*/

    //Backend OAuth
    /*useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const username = params.get('username');
    
        if (token) {
            localStorage.setItem('reddit_token', token);
        }
        if (username) {
            localStorage.setItem('reddit_username', username);
        }
        if (token || username) {
            window.history.replaceState({}, document.title, '/');
        }
      }, []); */

    return(
        <>
            <Router>
                <Routes>
            
                        {/* Home/Main */}
                        <Route path="/" element={<Home />} />

                        {/* Header */}
                        

                        {/* Nav */}
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/settings" element={<Settings />} />

                        {/* Features */}
                        <Route path='/posts/:id' element={<Post />} />
                        <Route path="/m/:submeddit" element={<Submeddits />} />
                        <Route path="/u/:username" element={<User />} />

                    {/* Outside layout */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
         </>
    );
}

export default App;
