'use client';

import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const getGradientColor = (id) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        ];
        const index = id ? id.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    if (cartItems.length === 0) {
        return (
            <div className={styles.cartPage}>
                <div className="container">
                    <div className={styles.emptyCart}>
                        <ShoppingCart size={64} />
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/products" className="btn btn-primary btn-lg">
                            Start Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                </div>

                <div className={styles.cartLayout}>
                    {/* Cart Items */}
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item.prodId} className={styles.cartItem}>
                                <div
                                    className={styles.itemImage}
                                    style={{ background: getGradientColor(item.prodId) }}
                                >
                                    <span>{item.prodName?.charAt(0)?.toUpperCase() || 'P'}</span>
                                </div>

                                <div className={styles.itemDetails}>
                                    <Link href={`/products/${item.prodId}`} className={styles.itemName}>
                                        {item.prodName}
                                    </Link>
                                    <span className={styles.itemCategory}>{item.prodCat}</span>
                                    <span className={styles.itemPrice}>₹{item.prodPrice?.toLocaleString()}</span>
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => updateQuantity(item.prodId, item.quantity - 1)}
                                            className={styles.quantityBtn}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.quantityValue}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.prodId, item.quantity + 1)}
                                            className={styles.quantityBtn}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <span className={styles.itemTotal}>
                                        ₹{(item.prodPrice * item.quantity).toLocaleString()}
                                    </span>

                                    <button
                                        onClick={() => removeFromCart(item.prodId)}
                                        className={styles.removeBtn}
                                        title="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button onClick={clearCart} className={styles.clearBtn}>
                            <Trash2 size={16} />
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{getCartTotal().toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span className={styles.freeShipping}>
                                    {getCartTotal() >= 999 ? 'Free' : '₹99'}
                                </span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total</span>
                                <span>
                                    ₹{(getCartTotal() + (getCartTotal() >= 999 ? 0 : 99)).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {getCartTotal() < 999 && (
                            <p className={styles.freeShippingNote}>
                                Add ₹{(999 - getCartTotal()).toLocaleString()} more for free shipping!
                            </p>
                        )}

                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                            <ShoppingBag size={20} />
                            Proceed to Checkout
                        </button>

                        <Link href="/products" className={styles.continueShopping}>
                            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
