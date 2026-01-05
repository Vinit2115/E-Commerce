'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { getCartCount } = useCart();

    const cartCount = getCartCount();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
    ];

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🛍️</span>
                    <span className={styles.logoText}>
                        E<span className="heading-gradient">com</span>
                    </span>
                </Link>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {isAdmin && (
                        <Link
                            href="/admin"
                            className={`${styles.navLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <LayoutDashboard size={18} />
                            Admin
                        </Link>
                    )}
                </div>

                <div className={styles.navActions}>
                    <Link href="/cart" className={styles.cartBtn}>
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>

                    {isAuthenticated ? (
                        <div className={styles.userMenu}>
                            <Link href="/profile" className={styles.userBtn}>
                                <User size={22} />
                                <span className={styles.userName}>{user?.userName}</span>
                            </Link>
                            <button onClick={handleLogout} className={styles.logoutBtn} title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}

                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
