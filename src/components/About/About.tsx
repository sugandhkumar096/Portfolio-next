'use client';

import React from 'react';
import Image from 'next/image';
import profile from '../../../public/myimg.jpg';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
    const skills = [
        { name: 'HTML', percentage: 90, description: 'Structuring content with semantic precision.' },
        { name: 'CSS', percentage: 90, description: 'Breathing life into designs with colors and animations.' },
        { name: 'JavaScript', percentage: 80, description: 'Adding interactivity, logic, and smooth user experiences.' },
        { name: 'React.js', percentage: 65, description: 'Building dynamic, fast, and scalable user interfaces.' },
    ];

    const info = [
        { label: 'Name', value: 'Sugandh Kumar' },
        { label: 'Email', value: 'Sugandhkumarkvs095@gmail.com' },
        { label: 'Role', value: 'Software Engineer' },
        { label: 'Experience', value: '8+ Months' },
        { label: 'Nationality', value: 'Indian' },
        { label: 'Freelance', value: 'Available' },
    ];

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>About Me</h2>
                    <p>Curious mind, creative coder.</p>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.imageSection}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={profile}
                                alt="Sugandh Kumar"
                                width={400}
                                height={500}
                                className={styles.profileImage}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.textSection}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3>Web Developer</h3>
                        <p className={styles.bio}>
                            I’m a passionate and detail-oriented Web Developer with a strong foundation in HTML, CSS, JavaScript, and modern frameworks like React. I enjoy transforming ideas into interactive, user-friendly, and responsive web applications.
                        </p>

                        <div className={styles.infoGrid}>
                            {info.map((item, index) => (
                                <div key={index} className={styles.infoItem}>
                                    <span className={styles.label}>{item.label}:</span>
                                    <span className={styles.value}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className={styles.skillsSection}>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        My Skills
                    </motion.h3>

                    <div className={styles.skillsGrid}>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className={styles.skillCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className={styles.skillHeader}>
                                    <h4>{skill.name}</h4>
                                    <span>{skill.percentage}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <motion.div
                                        className={styles.progressFill}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                                <p>{skill.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
