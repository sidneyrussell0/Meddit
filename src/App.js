//Main
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Home&Layout
import Home from './features/home/Home';
import Layout from './components/layout/Layout';

//Nav
import About from './features/about/About';
import Help from './features/help/Help';
import Settings from './features/settings/Settings';

//Features
import Post from './features/post/Post';
/*import SearchResults from '../features/search/SearchResults';*/
import Submeddits from './features/submeddits/Submeddits';
import User from './features/user/User';


function App() {
    return(
            <Router>
                <Routes>
                        <Route path ="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="help" element={<Help />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path='posts/:id' element={<Post />} />
                            <Route path="m/:submeddit" element={<Submeddits />} />
                            <Route path="u/:username" element={<User />} />
                        </Route>

                    {/* 404 */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
    );
}

export default App;
