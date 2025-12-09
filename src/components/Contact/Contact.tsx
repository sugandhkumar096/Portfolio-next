'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiGooglemaps } from 'react-icons/si';
import { CiPhone } from 'react-icons/ci';
import { FaRegEnvelope } from 'react-icons/fa6';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            setStatus('Error sending message.');
        }
    };

    return (
        <footer className={styles.contact} id="contact">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Contact Me</h2>
                    <p>Have a project in mind? Let's discuss.</p>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.infoSection}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.infoItem}>
                            <div className={styles.icon}><SiGooglemaps /></div>
                            <div>
                                <h3>Address</h3>
                                <p>Ratnagiri, Bhopal (462022), India</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.icon}><CiPhone /></div>
                            <div>
                                <h3>Call Me</h3>
                                <p>+91 969-343-1715</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.icon}><FaRegEnvelope /></div>
                            <div>
                                <h3>Email Me</h3>
                                <p>Sugandhkumarkvs095@gmail.com</p>
                            </div>
                        </div>

                        <div className={styles.mapContainer}>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092183!2d144.95373621531853!3d-37.81720997975111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0d1b75%3A0x5045675218ceed1!2sDowntown!5e0!3m2!1sen!2sau!4v1614629268390!5m2!1sen!2sau"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.formSection}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    suppressHydrationWarning
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn} suppressHydrationWarning>
                                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status && <p style={{ marginTop: '1rem', color: status.includes('success') ? '#00d2ff' : '#ff4d4d' }}>{status}</p>}
                        </form>
                    </motion.div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© Copyright Sugandh Kumar. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
