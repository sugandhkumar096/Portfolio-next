'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Portfolio.module.css';

const Portfolio = () => {
    const projects = [
        {
            title: "Portfolio Websites",
            description: "Crafting smooth, responsive interfaces that balance aesthetic appeal with practical functionality.",
            image: "/portfolio.png",
            tags: ["React", "CSS", "Responsive"],
        },
        {
            title: "Zerodha Clone",
            description: "Intuitive dashboard for product management, emphasizing clarity and user efficiency.",
            image: "/clone.png",
            tags: ["React", "Dashboard", "Finance"],
        },
        {
            title: "Hotel Management System",
            description: "Modern admin panel with a focus on usability and seamless navigation for end users.",
            image: "/Hotel.png",
            tags: ["Admin Panel", "Management", "UI/UX"],
        },
        {
            title: "Play School Websites",
            description: "Showcasing programs, facilities, and admissions to help parents choose the right environment.",
            image: "/play.png",
            tags: ["Education", "Colorful", "Informative"],
        },
        {
            title: "Freelancer Websites",
            description: "Online platform where skilled professionals showcase their work enabling flexible collaboration.",
            image: "/freelancer.png",
            tags: ["Marketplace", "Professional", "Connect"],
        },
        {
            title: "E-commerce Platform",
            description: "Fashion e-commerce features including product collections, size guides, and easy returns.",
            image: "/Ecommerce.webp",
            tags: ["E-commerce", "Shopping", "Fashion"],
        },
    ];

    return (
        <section className={styles.portfolio} id="portfolio">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>My Portfolio</h2>
                    <p>A selection of my recent work and projects.</p>
                </motion.div>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={styles.projectImage}
                                />
                                <div className={styles.overlay}>
                                    <button className={styles.viewBtn} suppressHydrationWarning>View Case Study</button>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
