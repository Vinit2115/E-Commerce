'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Package, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { productAPI } from '@/api/productAPI';
import styles from './page.module.css';

export default function ManageProductsPage() {
    const router = useRouter();
    const { isAuthenticated, isAdmin } = useAuth();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        prodId: '',
        prodName: '',
        prodCat: '',
        prodPrice: '',
        prodDesc: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!isAdmin) {
            router.push('/');
            return;
        }
        fetchProducts();
    }, [isAuthenticated, isAdmin, router]);

    const fetchProducts = async () => {
        try {
            const data = await productAPI.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.prodId || !formData.prodName || !formData.prodPrice) {
            setError('Please fill in required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const productData = {
                ...formData,
                prodPrice: parseFloat(formData.prodPrice),
            };
            await productAPI.addProduct(productData);
            await fetchProducts();
            setIsModalOpen(false);
            setFormData({
                prodId: '',
                prodName: '',
                prodCat: '',
                prodPrice: '',
                prodDesc: '',
            });
        } catch (err) {
            setError(err.response?.data || 'Failed to add product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (prodId) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await productAPI.deleteProduct(prodId);
            await fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const getGradientColor = (id) => {
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
        ];
        const index = id ? id.charCodeAt(0) % colors.length : 0;
        return colors[index];
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
                        <Package size={28} />
                        Manage Products
                    </h1>
                    <Link href="/admin/add-product" className="btn btn-primary">
                        <Plus size={18} />
                        Add Product
                    </Link>
                </div>

                {isLoading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>Product</span>
                            <span>Category</span>
                            <span>Price</span>
                            <span>Actions</span>
                        </div>
                        {products.map((product) => (
                            <div key={product.prodId} className={styles.tableRow}>
                                <div className={styles.productCell}>
                                    <div
                                        className={styles.productImage}
                                        style={
                                            product.prodImage
                                                ? {}
                                                : { background: getGradientColor(product.prodId) }
                                        }
                                    >
                                        {product.prodImage ? (
                                            <img
                                                src={product.prodImage}
                                                alt={product.prodName}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                                            />
                                        ) : (
                                            product.prodName?.charAt(0)?.toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <span className={styles.productName}>{product.prodName}</span>
                                        <span className={styles.productId}>ID: {product.prodId}</span>
                                    </div>
                                </div>
                                <span className={styles.category}>{product.prodCat || '-'}</span>
                                <span className={styles.price}>₹{product.prodPrice?.toLocaleString()}</span>
                                <button
                                    onClick={() => handleDelete(product.prodId)}
                                    className={styles.deleteBtn}
                                    title="Delete product"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <Package size={48} />
                        <p>No products found. Add your first product!</p>
                    </div>
                )}

                {/* Add Product Modal */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h2>Add New Product</h2>
                                <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                {error && <div className="alert alert-error">{error}</div>}

                                <div className="form-group">
                                    <label htmlFor="prodId">Product ID *</label>
                                    <input
                                        type="text"
                                        id="prodId"
                                        name="prodId"
                                        value={formData.prodId}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="e.g., PROD001"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prodName">Product Name *</label>
                                    <input
                                        type="text"
                                        id="prodName"
                                        name="prodName"
                                        value={formData.prodName}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prodCat">Category</label>
                                    <input
                                        type="text"
                                        id="prodCat"
                                        name="prodCat"
                                        value={formData.prodCat}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="e.g., Electronics"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prodPrice">Price (₹) *</label>
                                    <input
                                        type="number"
                                        id="prodPrice"
                                        name="prodPrice"
                                        value={formData.prodPrice}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prodDesc">Description</label>
                                    <textarea
                                        id="prodDesc"
                                        name="prodDesc"
                                        value={formData.prodDesc}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter product description"
                                        rows={3}
                                        style={{ resize: 'vertical' }}
                                    />
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Adding...' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
