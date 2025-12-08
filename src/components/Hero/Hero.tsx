'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className={styles.badge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Available for Work
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Hey! I'm <span className={styles.highlight}>Sugandh</span>
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Transforming ideas into elegant solutions through creative design
                        and innovative development.
                    </motion.p>

                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className={styles.statItem}>
                            <h3>8+</h3>
                            <p>Months Experience</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>12+</h3>
                            <p>Projects Completed</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>10+</h3>
                            <p>Happy Clients</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.buttons}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                    >
                        <a href="#portfolio" className={styles.primaryBtn}>
                            View My Work <FaArrowRight />
                        </a>
                        <a href="/my_resume_3_0 (1) (2) (1).pdf" target="_blank" className={styles.secondaryBtn}>
                            Download CV <FaDownload />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src="/profile-1.webp"
                            alt="Sugandh Kumar"
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className={styles.profileImage}
                            priority
                        />
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
