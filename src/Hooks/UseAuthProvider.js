import React, { useState, useEffect, useCallback } from 'react';
import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from '../Firebase/config';

export const AuthContext = React.createContext();

const UseAuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebaseApp.initializeApp(config);
        setAuth(firebaseApp.auth());
        setDb(firebaseApp.firestore());
    }, []);

    useEffect(() => {
        if (!auth) {
            return;
        }
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log('user', user);
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const signIn = useCallback((email, password) => {
        return auth
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    }, [auth]);

    const signUp = useCallback((email, password) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    }, [auth]);

    const signOut = useCallback(() => {
        return auth.signOut()
            .then(() => {
                setUser(null);
            });
    }, [auth]);


    return (
        <AuthContext.Provider
            value={ {
                user,
                db,
                signIn,
                signUp,
                signOut,
            } }>
            { children }
        </AuthContext.Provider>
    );
};

export default UseAuthProvider;
