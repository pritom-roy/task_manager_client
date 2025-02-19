import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { useEffect, useState } from 'react';
// import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser) {
                setUser(currentUser);
                console.log(currentUser)

                // if (currentUser.displayName) {
                //     const newUser = {
                //         email: currentUser.email,
                //         username: currentUser.displayName,
                //     };
                //     const response = await axios.post('https://griho-bandhan-server.vercel.app/users', newUser);
                //     console.log("User saved to backend:", response.data);
                // }

            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, googleSignin, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;
