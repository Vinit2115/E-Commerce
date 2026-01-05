import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerGrid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>🛍️</span>
                            <span className={styles.logoText}>
                                E<span className="heading-gradient">com</span>
                            </span>
                        </Link>
                        <p className={styles.brandDesc}>
                            Your premium destination for quality products at unbeatable prices.
                        </p>
                    </div>

                    <div className={styles.linksGroup}>
                        <h4>Quick Links</h4>
                        <Link href="/">Home</Link>
                        <Link href="/products">Products</Link>
                        <Link href="/cart">Cart</Link>
                    </div>

                    <div className={styles.linksGroup}>
                        <h4>Account</h4>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                        <Link href="/profile">Profile</Link>
                    </div>

                    <div className={styles.linksGroup}>
                        <h4>Connect</h4>
                        <a href="mailto:support@ecom.com" className={styles.socialLink}>
                            <Mail size={16} />
                            support@ecom.com
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <Twitter size={16} />
                            Twitter
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <Github size={16} />
                            GitHub
                        </a>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© {currentYear} Ecom. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={14} className={styles.heart} /> by Vinit
                    </p>
                </div>
            </div>
        </footer>
    );
}
