import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setIsAdmin(decodedToken.user._doc.role === 'USER');
        }
    }, []);

    return isAdmin;
};
