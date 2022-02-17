import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { ROLES } from '../constants/auth';

export const AuthContext = createContext({ auth: [] });

export default function AuthContextComponent({ children }) {
    const [role, setRole] = useState(ROLES.USER);

    useEffect(() => {
        getRole();
    }, []);

    const getRole = async () => {
        const response = await axios.get('/api/auth/role');
        if (response.data.isAdmin) {
            setRole(ROLES.ADMIN);
        };
    };

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    );
};