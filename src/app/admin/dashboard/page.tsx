'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Ensure no caching to get fresh data
                const res = await fetch('/api/admin/messages', {
                    cache: 'no-store',
                    headers: { 'Pragma': 'no-cache' }
                });

                if (res.ok) {
                    const data = await res.json();
                    setMessages(data.messages);
                } else {
                    if (res.status === 401) {
                        router.push('/admin/login');
                    } else {
                        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
                        setError(`Failed to load: ${errData.error || res.statusText}`);
                    }
                }
            } catch (error) {
                setError('Connection error. Please check your network.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [router]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00d2ff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p>Loading Dashboard...</p>
                <style jsx>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ color: '#ff4d4d' }}>Error Loading Dashboard</h2>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{ padding: '0.8rem 1.5rem', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem', paddingTop: '100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: '#00d2ff', margin: 0 }}>Admin Dashboard</h1>
                    <button
                        onClick={() => {
                            // Simple logout: clear cookie by setting past date (optional implementation) or just redirect
                            document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            router.push('/admin/login');
                        }}
                        style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {messages.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                            <p style={{ opacity: 0.6, fontSize: '1.2rem' }}>No messages found yet.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg._id} style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'transform 0.2s',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{msg.name}</h3>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#00d2ff' }}>{msg.email}</p>
                                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{msg.subject}</p>
                                <p style={{ opacity: 0.8, whiteSpace: 'pre-wrap', fontSize: '0.95rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '5px' }}>{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
