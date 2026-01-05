'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { productAPI } from '@/api/productAPI';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getAllProducts();
                setProducts(data);
                setFilteredProducts(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map((p) => p.prodCat).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter((p) => p.prodCat === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.prodName?.toLowerCase().includes(query) ||
                    p.prodDesc?.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, searchQuery]);

    return (
        <div className={styles.productsPage}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1>All Products</h1>
                        <p>{filteredProducts.length} products found</p>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Search */}
                        <div className={styles.searchBox}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        {/* Categories */}
                        <div className={styles.filterSection}>
                            <h3>
                                <Filter size={18} />
                                Categories
                            </h3>
                            <div className={styles.categoryList}>
                                <button
                                    className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    All Products
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className={styles.main}>
                        {isLoading ? (
                            <div className={styles.productsGrid}>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={styles.productSkeleton}>
                                        <div className={`skeleton ${styles.skeletonImage}`}></div>
                                        <div className={styles.skeletonContent}>
                                            <div className={`skeleton ${styles.skeletonText}`}></div>
                                            <div className={`skeleton ${styles.skeletonTextSm}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className={styles.productsGrid}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.prodId} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <Search size={48} />
                                <h3>No products found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
