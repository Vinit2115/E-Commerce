'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Minus, Plus, Package, Tag } from 'lucide-react';
import { productAPI } from '@/api/productAPI';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productAPI.getProductById(params.id);
                setProduct(data);

                // Fetch related products from same category
                if (data?.prodCat) {
                    const relatedData = await productAPI.getProductsByCategory(data.prodCat);
                    setRelatedProducts(relatedData.filter((p) => p.prodId !== params.id).slice(0, 4));
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Generate a placeholder gradient based on product id
    const getGradientColor = (id) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        ];
        const index = id ? id.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    if (isLoading) {
        return (
            <div className={styles.productPage}>
                <div className="container">
                    <div className={styles.productGrid}>
                        <div className={`skeleton ${styles.imageSkeleton}`}></div>
                        <div className={styles.detailsSkeleton}>
                            <div className={`skeleton ${styles.titleSkeleton}`}></div>
                            <div className={`skeleton ${styles.priceSkeleton}`}></div>
                            <div className={`skeleton ${styles.descSkeleton}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={styles.productPage}>
                <div className="container">
                    <div className={styles.notFound}>
                        <Package size={64} />
                        <h2>Product Not Found</h2>
                        <p>The product you're looking for doesn't exist.</p>
                        <Link href="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.productPage}>
            <div className="container">
                {/* Back Button */}
                <button onClick={() => router.back()} className={styles.backBtn}>
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Product Details */}
                <div className={styles.productGrid}>
                    <div
                        className={styles.imageWrapper}
                        style={{ background: getGradientColor(product.prodId) }}
                    >
                        <div className={styles.imagePlaceholder}>
                            {product.prodName?.charAt(0)?.toUpperCase() || 'P'}
                        </div>
                    </div>

                    <div className={styles.details}>
                        <span className={styles.category}>
                            <Tag size={14} />
                            {product.prodCat}
                        </span>

                        <h1 className={styles.title}>{product.prodName}</h1>

                        <p className={styles.price}>₹{product.prodPrice?.toLocaleString()}</p>

                        <p className={styles.description}>{product.prodDesc}</p>

                        <div className={styles.actions}>
                            <div className={styles.quantityControl}>
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className={styles.quantityBtn}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className={styles.quantityValue}>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className={styles.quantityBtn}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`btn btn-primary btn-lg ${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
                            >
                                <ShoppingCart size={20} />
                                {isAdded ? 'Added!' : 'Add to Cart'}
                            </button>
                        </div>

                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <Package size={18} />
                                <span>Free shipping on orders over ₹999</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className={styles.related}>
                        <h2>Related Products</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.prodId} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
