import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // 1. Connect to Database
        await connectDB();

        // 2. Save Message to Database
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });

        // 3. Send Email Notification
        // Only attempt to send email if credentials are provided
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or use host/port for other providers
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to yourself
                subject: `New Portfolio Message: ${subject}`,
                html: `
                    <h2>New Message from ${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            };

            await transporter.sendMail(mailOptions);
        } else {
            console.warn('Email credentials not found. Skipping email notification.');
        }

        return NextResponse.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
        );

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
