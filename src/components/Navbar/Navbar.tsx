'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaInstagram, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Resume', href: '/my_resume_3_0 (1) (2) (1).pdf', target: '_blank' }, // Using public asset path
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
        { name: 'Admin', href: '/admin/login' },
    ];

    const socialLinks = [
        { icon: <FaXTwitter />, href: '#' },
        { icon: <FaFacebook />, href: '#' },
        { icon: <FaInstagram />, href: '#' },
        { icon: <FaLinkedin />, href: '#' },
    ];

    return (
        <motion.nav
            className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Sugandh Kumar
                </Link>

                <div className={styles.desktopMenu}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={styles.navLink}
                                    target={link.target}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.socialLinks}>
                        {socialLinks.map((social, index) => (
                            <li key={index}>
                                <a href={social.href} target="_blank" rel="noopener noreferrer">
                                    {social.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className={styles.menuToggle} onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <ul className={styles.mobileNavLinks}>
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={toggleMenu}
                                            target={link.target}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.mobileSocials}>
                                {socialLinks.map((social, index) => (
                                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
