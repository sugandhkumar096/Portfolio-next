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
                        // Show error for 500 or other issues
                        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
                        console.error('Dashboard Error:', errData);
                        alert(`Failed to load messages: ${errData.error || res.statusText}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                alert('Connection error. Please check your network or server.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [router]);

    if (loading) {
        return <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem', color: '#00d2ff' }}>Admin Dashboard</h1>
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {messages.length === 0 ? (
                        <p>No messages found.</p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg._id} style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{msg.name}</h3>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#00d2ff' }}>{msg.email}</p>
                                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{msg.subject}</p>
                                <p style={{ opacity: 0.8, whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
