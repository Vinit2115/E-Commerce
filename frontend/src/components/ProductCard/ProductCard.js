'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    // Generate a placeholder gradient based on product id
    const getGradientColor = (id) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        ];
        const index = id ? id.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    return (
        <Link href={`/products/${product.prodId}`} className={styles.card}>
            <div
                className={styles.imageWrapper}
                style={{ background: getGradientColor(product.prodId) }}
            >
                <div className={styles.imagePlaceholder}>
                    {product.prodName?.charAt(0)?.toUpperCase() || 'P'}
                </div>
                <div className={styles.overlay}>
                    <button className={styles.quickAdd} onClick={handleAddToCart}>
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <span className={styles.category}>{product.prodCat}</span>
                <h3 className={styles.title}>{product.prodName}</h3>
                <p className={styles.description}>
                    {product.prodDesc?.length > 60
                        ? `${product.prodDesc.substring(0, 60)}...`
                        : product.prodDesc}
                </p>
                <div className={styles.footer}>
                    <span className={styles.price}>₹{product.prodPrice?.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    );
}
