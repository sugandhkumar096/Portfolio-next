'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaShoppingCart, FaRocket, FaTools } from 'react-icons/fa';
import styles from './Services.module.css';

const Services = () => {
    const services = [
        {
            icon: <FaLaptopCode />,
            title: 'Web Development',
            subtitle: 'Full-Stack Solutions',
            description: 'Build modern, scalable web applications using cutting-edge technologies like React, Node.js, and cloud platforms.',
            price: 'Starting from $2,500',
        },
        {
            icon: <FaShoppingCart />,
            title: 'E-commerce Solution',
            subtitle: 'Online Store Development',
            description: 'Build powerful e-commerce platforms with secure payment processing, inventory management, and analytics.',
            price: 'Starting from $4,000',
        },
        {
            icon: <FaRocket />,
            title: 'Web Optimization',
            subtitle: 'Performance & SEO',
            description: 'Optimize your website for speed, search engines, and user experience to maximize conversions and traffic.',
            price: 'Starting from $1,200',
        },
        {
            icon: <FaTools />,
            title: 'Website Maintenance',
            subtitle: 'Ongoing Support',
            description: 'Keep your website secure, updated, and running smoothly with regular maintenance and technical support.',
            price: 'Starting from $500/Month',
        },
    ];

    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>What I Can Do For You</h2>
                    <p>Comprehensive digital solutions for your business growth.</p>
                </motion.div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <h4>{service.subtitle}</h4>
                            <p>{service.description}</p>
                            <div className={styles.price}>{service.price}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
