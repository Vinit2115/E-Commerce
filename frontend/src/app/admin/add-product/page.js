'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Plus, DollarSign, Tag, FileText, Layout } from 'lucide-react';
import { productAPI } from '@/api/productAPI';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function AddProductPage() {
    const router = useRouter();
    const { isAdmin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        prodId: '',
        prodName: '',
        prodDesc: '',
        prodPrice: '',
        prodCat: '',
        prodImage: '',
    });

    // Protect route - simple client-side check
    if (!isAdmin) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Convert price to number
            const payload = {
                ...formData,
                prodPrice: parseFloat(formData.prodPrice),
            };

            await productAPI.addProduct(payload);
            setMessage({ type: 'success', text: 'Product added successfully!' });

            // Reset form
            setFormData({
                prodId: '',
                prodName: '',
                prodDesc: '',
                prodPrice: '',
                prodCat: '',
                prodImage: '',
            });

            // Redirect after delay
            setTimeout(() => {
                router.push('/products');
            }, 1000);

        } catch (error) {
            console.error('Error adding product:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to add product. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.adminCard}>
                    <div className={styles.adminHeader}>
                        <h1>Add New Product</h1>
                        <p>Create a new product listing in the store</p>
                    </div>

                    {message.text && (
                        <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.adminForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="prodId">Product ID</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="prodId"
                                    name="prodId"
                                    value={formData.prodId}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="e.g., PROD001"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prodName">Product Name</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="prodName"
                                    name="prodName"
                                    value={formData.prodName}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="prodPrice">Price (₹)</label>
                                <input
                                    type="number"
                                    id="prodPrice"
                                    name="prodPrice"
                                    value={formData.prodPrice}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="prodCat">Category</label>
                                <select
                                    id="prodCat"
                                    name="prodCat"
                                    value={formData.prodCat}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Home">Home</option>
                                    <option value="Beauty">Beauty</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Books">Books</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prodImage">Image URL</label>
                            <div className="input-group">
                                <input
                                    type="url"
                                    id="prodImage"
                                    name="prodImage"
                                    value={formData.prodImage}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prodDesc">Description</label>
                            <textarea
                                id="prodDesc"
                                name="prodDesc"
                                value={formData.prodDesc}
                                onChange={handleChange}
                                className={styles.textarea}
                                placeholder="Enter detailed product description..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loader" style={{ width: 20, height: 20 }}></span>
                            ) : (
                                <>
                                    <Plus size={20} />
                                    Add Product
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
