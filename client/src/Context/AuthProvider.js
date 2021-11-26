import { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProvider = function ({ children }) {
    return <AuthContext.Provider value={useFirebase()}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
