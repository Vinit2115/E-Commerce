'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trash2, Users, Shield, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/api/userAPI';
import styles from '../products/page.module.css';

export default function ManageUsersPage() {
    const router = useRouter();
    const { user: currentUser, isAuthenticated, isAdmin } = useAuth();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!isAdmin) {
            router.push('/');
            return;
        }
        fetchUsers();
    }, [isAuthenticated, isAdmin, router]);

    const fetchUsers = async () => {
        try {
            const data = await userAPI.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (userId === currentUser?.userId) {
            alert("You cannot delete your own account!");
            return;
        }
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await userAPI.deleteUser(userId);
            await fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    if (!isAuthenticated || !isAdmin) return null;

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/admin" className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </Link>
                    <h1>
                        <Users size={28} />
                        Manage Users
                    </h1>
                </div>

                {isLoading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : users.length > 0 ? (
                    <div className={styles.table}>
                        <div className={styles.tableHeader} style={{ gridTemplateColumns: '2fr 2fr 1fr 80px' }}>
                            <span>User</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Actions</span>
                        </div>
                        {users.map((user) => (
                            <div
                                key={user.userId}
                                className={styles.tableRow}
                                style={{ gridTemplateColumns: '2fr 2fr 1fr 80px' }}
                            >
                                <div className={styles.productCell}>
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 'var(--radius-full)',
                                            background: user.role === 'ADMIN' ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: user.role === 'ADMIN' ? 'white' : 'var(--text-muted)',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        {user.userName?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <span className={styles.productName}>{user.userName}</span>
                                        <span className={styles.productId}>ID: {user.userId}</span>
                                    </div>
                                </div>
                                <span className={styles.category}>{user.userEmail}</span>
                                <span>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            padding: '4px 10px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.8rem',
                                            fontWeight: 500,
                                            background: user.role === 'ADMIN' ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-tertiary)',
                                            color: user.role === 'ADMIN' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {user.role === 'ADMIN' ? <Shield size={12} /> : <User size={12} />}
                                        {user.role || 'USER'}
                                    </span>
                                </span>
                                <button
                                    onClick={() => handleDelete(user.userId)}
                                    className={styles.deleteBtn}
                                    title="Delete user"
                                    disabled={user.userId === currentUser?.userId}
                                    style={{
                                        opacity: user.userId === currentUser?.userId ? 0.3 : 1,
                                        cursor: user.userId === currentUser?.userId ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <Users size={48} />
                        <p>No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
