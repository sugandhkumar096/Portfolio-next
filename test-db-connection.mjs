const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Simple .env parser since we might not have dotenv installed in a way we can easily require with ES/CommonJS mix
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                const parts = line.split('=');
                if (parts.length >= 2 && !line.startsWith('#')) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join('=').trim();
                    process.env[key] = value;
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env.local', e);
    }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB Connection...');
console.log('URI:', MONGODB_URI ? MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'Undefined');

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB!');
        console.log(`State: ${mongoose.connection.readyState} (1 = Connected)`);
        console.log('Host:', mongoose.connection.host);
        console.log('Database Name:', mongoose.connection.name);
        return mongoose.disconnect();
    })
    .then(() => {
        console.log('Disconnected safely.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Connection Failed:', err.message);
        if (err.message.includes('ECONNREFUSED')) {
            console.error('Hint: Make sure MongoDB is running (try running "mongod" in a terminal).');
        }
        process.exit(1);
    });
