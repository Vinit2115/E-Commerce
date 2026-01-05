'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Key, Save, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, isAdmin, isLoading: authLoading, logout, updatePassword } = useAuth();

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Redirect if not authenticated - using useEffect to avoid render-time navigation
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
        setMessage({ type: '', text: '' });
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!passwordData.newPassword || !passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setIsUpdating(true);
        const result = await updatePassword(passwordData.newPassword);
        setIsUpdating(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className={styles.profilePage}>
                <div className="container">
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated (redirect will happen via useEffect)
    if (!isAuthenticated) {
        return (
            <div className={styles.profilePage}>
                <div className="container">
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profilePage}>
            <div className="container">
                <h1 className="fade-in-up">My Profile</h1>

                <div className={styles.profileGrid}>
                    {/* User Info Card */}
                    <div className={`${styles.card} fade-in-up`} style={{ animationDelay: '0.1s' }}>
                        <div className={styles.cardHeader}>
                            <User size={20} />
                            <h2>Account Information</h2>
                        </div>

                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Name</span>
                                    <span className={styles.infoValue}>{user?.userName}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Email</span>
                                    <span className={styles.infoValue}>{user?.userEmail}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Account Type</span>
                                    <span className={styles.infoValue}>
                                        <span className={`${styles.badge} ${isAdmin ? styles.badgeAdmin : ''}`}>
                                            {isAdmin && <Shield size={12} />}
                                            {user?.role || 'USER'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password Card */}
                    <div className={`${styles.card} fade-in-up`} style={{ animationDelay: '0.2s' }}>
                        <div className={styles.cardHeader}>
                            <Key size={20} />
                            <h2>Change Password</h2>
                        </div>

                        <form onSubmit={handleUpdatePassword} className={styles.passwordForm}>
                            {message.text && (
                                <div className={`alert alert-${message.type}`}>{message.text}</div>
                            )}

                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <div className={styles.inputWrapper}>
                                    <Lock size={18} className={styles.inputIcon} />
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className="input"
                                        style={{ paddingLeft: '44px' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className={styles.inputWrapper}>
                                    <Lock size={18} className={styles.inputIcon} />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        className="input"
                                        style={{ paddingLeft: '44px' }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <span className="loader" style={{ width: 18, height: 18 }}></span>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Logout Card */}
                    <div className={`${styles.card} fade-in-up`} style={{ animationDelay: '0.3s' }}>
                        <div className={styles.cardHeader}>
                            <LogOut size={20} />
                            <h2>Sign Out</h2>
                        </div>
                        <p className={styles.logoutText}>
                            Sign out of your account. You'll need to log in again to access your account.
                        </p>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
