import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';

import './Home.css';
import { AuthContext } from '../../Hooks/UseAuthProvider';

const Home = () => {
    const { signOut } = useContext(AuthContext);
    return (
        <div className='Home'>
            <h1>Home</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={signOut}>
                Sign out
            </Button>
        </div>
    );
};

export default Home;
