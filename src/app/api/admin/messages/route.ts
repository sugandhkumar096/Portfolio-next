import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');
        console.log('Fetching Messages. Session:', adminSession?.value);

        if (!adminSession || adminSession.value !== 'true') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const messages = await Message.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ messages });

    } catch (error) {
        console.error('Fetch Messages Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
