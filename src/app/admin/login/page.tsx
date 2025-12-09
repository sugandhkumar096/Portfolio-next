'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                setError('Invalid Password');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            color: '#fff',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00d2ff' }}>Admin Login</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            outline: 'none',
                        }}
                        required
                    />
                    {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '1rem',
                            borderRadius: '50px',
                            border: 'none',
                            background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
