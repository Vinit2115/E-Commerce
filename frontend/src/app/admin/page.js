'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Users, ShoppingBag, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { productAPI } from '@/api/productAPI';
import { userAPI } from '@/api/userAPI';
import styles from './page.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const { isAuthenticated, isAdmin } = useAuth();

    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        categories: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Redirect if not admin
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!isAdmin) {
            router.push('/');
            return;
        }

        const fetchStats = async () => {
            try {
                const [products, users] = await Promise.all([
                    productAPI.getAllProducts(),
                    userAPI.getAllUsers(),
                ]);

                const uniqueCategories = [...new Set(products.map((p) => p.prodCat).filter(Boolean))];

                setStats({
                    products: products.length,
                    users: users.length,
                    categories: uniqueCategories.length,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [isAuthenticated, isAdmin, router]);

    if (!isAuthenticated || !isAdmin) {
        return null;
    }

    const statCards = [
        {
            title: 'Total Products',
            value: stats.products,
            icon: <Package size={24} />,
            color: '#8b5cf6',
        },
        {
            title: 'Total Users',
            value: stats.users,
            icon: <Users size={24} />,
            color: '#3b82f6',
        },
        {
            title: 'Categories',
            value: stats.categories,
            icon: <ShoppingBag size={24} />,
            color: '#22c55e',
        },
    ];

    const quickActions = [
        {
            title: 'Manage Products',
            description: 'View and edit existing products',
            href: '/admin/products',
            icon: <Package size={20} />,
        },
        {
            title: 'Add New Product',
            description: 'Create a new product listing',
            href: '/admin/add-product',
            icon: <Plus size={20} />,
        },
        {
            title: 'Manage Users',
            description: 'View and manage user accounts',
            href: '/admin/users',
            icon: <Users size={20} />,
        },
    ];

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h1>
                            <LayoutDashboard size={28} />
                            Admin Dashboard
                        </h1>
                        <p>Welcome back! Here's what's happening with your store.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    {statCards.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div
                                className={styles.statIcon}
                                style={{ background: `${stat.color}20`, color: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>
                                    {isLoading ? '-' : stat.value}
                                </span>
                                <span className={styles.statTitle}>{stat.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <section className={styles.section}>
                    <h2>Quick Actions</h2>
                    <div className={styles.actionsGrid}>
                        {quickActions.map((action, index) => (
                            <Link key={index} href={action.href} className={styles.actionCard}>
                                <div className={styles.actionIcon}>{action.icon}</div>
                                <div className={styles.actionContent}>
                                    <h3>{action.title}</h3>
                                    <p>{action.description}</p>
                                </div>
                                <ArrowRight size={20} className={styles.actionArrow} />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
