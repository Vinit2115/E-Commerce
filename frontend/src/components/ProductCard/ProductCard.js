'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
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
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
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
                    <button
                        className={`${styles.quickAdd} ${isAdded ? styles.added : ''}`}
                        onClick={handleAddToCart}
                    >
                        {isAdded ? (
                            <>
                                <Check size={18} />
                                Added!
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={18} />
                                Add to Cart
                            </>
                        )}
                    </button>
                    <div className={styles.viewBtn}>
                        <Eye size={18} />
                        View Details
                    </div>
                </div>

                <div className={styles.badge}>{product.prodCat}</div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{product.prodName}</h3>
                <p className={styles.description}>
                    {product.prodDesc?.length > 50
                        ? `${product.prodDesc.substring(0, 50)}...`
                        : product.prodDesc || 'Premium quality product'}
                </p>
                <div className={styles.footer}>
                    <span className={styles.price}>₹{product.prodPrice?.toLocaleString()}</span>
                    <button
                        className={styles.cartIcon}
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                </div>
            </div>
        </Link>
    );
}
