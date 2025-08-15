import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, loadUserByEmail, resetUserState, followUser } from './userSlice';


const ProfileComponent = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { currentUser, searchedUser, loading, error, success } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchProfile());

        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(resetUserState());
            }, 3000); //3 Seconds later

            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    const handleSearch = () => {
        dispatch(loadUserByEmail(email));
    };

    const handleFollow = (email) => {
        dispatch(followUser(email));
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {currentUser && <p>Welcome, {currentUser.name}</p>}

            {/* Searched User */}
            {searchedUser && (
                <div>
                    <p>{searchedUser.name} - Followers: {searchedUser.follows || 0}</p>
                    <button onClick={() => handleFollow(searchedUser.email)}>Follow</button>
                </div>
            )}
            <input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Search by email'
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};
   
export default ProfileComponent;