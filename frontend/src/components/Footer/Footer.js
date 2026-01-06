import Link from 'next/link';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerGrid}>
                    <div className={styles.brand}>
                        <Link href="/" className={`${styles.logo} wiggle`}>
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
                        <Link href="/" className="link-underline">Home</Link>
                        <Link href="/products" className="link-underline">Products</Link>
                        <Link href="/cart" className="link-underline">Cart</Link>
                    </div>

                    <div className={styles.linksGroup}>
                        <h4>Account</h4>
                        <Link href="/login" className="link-underline">Login</Link>
                        <Link href="/register" className="link-underline">Register</Link>
                        <Link href="/profile" className="link-underline">Profile</Link>
                    </div>

                    <div className={styles.linksGroup}>
                        <h4>Connect</h4>
                        <a href="mailto:support@ecom.com" className={`${styles.socialLink} icon-btn`}>
                            <Mail size={16} />
                            support@ecom.com
                        </a>
                        <a href="#" className={`${styles.socialLink} icon-btn`}>
                            <Twitter size={16} />
                            Twitter
                        </a>
                        <a href="#" className={`${styles.socialLink} icon-btn`}>
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
