import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const saveUser = (email, name, method) => {
        fetch('https://damp-lake-82171.herokuapp.com/users', {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch(({ message }) => console.log(message));
    };

    const signInWithGoogle = (from) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                setAuthError('');
                saveUser(result.user.email, result.user.displayName, 'PUT');
                navigate(from);
            })
            .catch(({ message }) => {
                setAuthError(message);
            });
    };

    const registerUser = (email, password, name, location) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setUser({ ...res.user, displayName: name });
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => {
                        navigate(location);
                        setAuthError('');
                    })
                    .catch(({ message }) => {
                        setAuthError(message);
                    });
            })
            .catch(({ message }) => {
                setAuthError(message);
            })
            .finally(() => setIsLoading(false));
    };

    const login = (email, password, location) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setAuthError('');
                navigate(location);
            })
            .catch(({ message }) => {
                setAuthError(message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setAuthError('');
            })
            .catch(({ message }) => {
                setAuthError(message);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            if (newUser) {
                getIdToken(newUser).then((token) => {
                    setAuthToken(token);
                });
                setUser(newUser);
            } else {
                setAuthToken('');
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        fetch(`https://damp-lake-82171.herokuapp.com/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setAdmin(data.isAdmin))
            .catch(({ message }) => console.log(message));
    }, [user?.email]);

    return {
        user,
        login,
        registerUser,
        logout,
        isLoading,
        authError,
        signInWithGoogle,
        authToken,
        admin
    };
};

export default useFirebase;
