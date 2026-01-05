'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, Truck, Shield, Headphones, Sparkles } from 'lucide-react';
import { productAPI } from '@/api/productAPI';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getAllProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const features = [
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      description: 'On orders over ₹999',
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description: 'Dedicated customer care',
    },
    {
      icon: <Star size={32} />,
      title: 'Premium Quality',
      description: 'Guaranteed satisfaction',
    },
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={`${styles.heroBadge} fade-in-up`}>
              <Sparkles size={16} className="pulse" />
              New Collection 2026
            </span>
            <h1 className={`${styles.heroTitle} fade-in-up stagger-1`}>
              Discover <span className="heading-gradient">Premium</span> Products
            </h1>
            <p className={`${styles.heroSubtitle} fade-in-up stagger-2`}>
              Explore our curated collection of high-quality products designed to elevate your lifestyle.
              Unbeatable prices, exceptional quality.
            </p>
            <div className={`${styles.heroActions} fade-in-up stagger-3`}>
              <Link href="/products" className="btn btn-primary btn-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link href="/products" className="btn btn-secondary btn-lg">
                View Collections
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.heroCard} glow-pulse`}>
              <div className={styles.heroCardInner}>
                <span className="float">🛍️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className={styles.floatingOrb1}></div>
        <div className={styles.floatingOrb2}></div>
        <div className={styles.floatingOrb3}></div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureCard} card-hover`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="fade-in-up">Featured Products</h2>
            <Link href="/products" className={`${styles.viewAll} link-underline`}>
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <div className={styles.productsGrid}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.productSkeleton}>
                  <div className={`skeleton ${styles.skeletonImage}`}></div>
                  <div className={styles.skeletonContent}>
                    <div className={`skeleton ${styles.skeletonText}`}></div>
                    <div className={`skeleton ${styles.skeletonTextSm}`}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {featuredProducts.map((product, index) => (
                <div
                  key={product.prodId}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`${styles.emptyState} fade-in-up`}>
              <ShoppingBag size={48} />
              <p>No products available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={`${styles.ctaCard} scale-in`}>
            <Sparkles size={32} className="bounce" />
            <h2>Ready to Shop?</h2>
            <p>Join thousands of satisfied customers and discover premium products today.</p>
            <Link href="/register" className="btn btn-primary btn-lg">
              Create Account
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
