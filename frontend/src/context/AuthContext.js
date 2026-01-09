'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/api/authAPI';
import { userAPI } from '@/api/userAPI';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authAPI.login(email, password);
            // Backend returns a message, we need to fetch user data
            // Relaxed check: if we get a response and no error was thrown by interceptor, assume success
            // The backend might return a simple string or an object
            if (response) {
                const userData = await userAPI.getUserByEmail(email);
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            } else {
                setError('Unexpected response from server');
                return { success: false, message: 'Unexpected response' };
            }
        } catch (err) {
            console.error('Login error:', err);
            const message = err.response?.data || 'Login failed. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authAPI.register(name, email, password);
            if (response) {
                return { success: true };
            } else {
                setError('Unexpected response from server');
                return { success: false, message: 'Unexpected response' };
            }
        } catch (err) {
            const message = err.response?.data || 'Registration failed. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updatePassword = async (newPassword) => {
        if (!user?.userId) return { success: false, message: 'Not logged in' };
        try {
            await userAPI.updatePassword(user.userId, newPassword);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data || 'Failed to update password' };
        }
    };

    const value = {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        updatePassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
