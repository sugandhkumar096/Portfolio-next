const baseUrl = 'http://localhost:3000';

async function testContact() {
    console.log('Testing Contact API...');
    try {
        const res = await fetch(`${baseUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Bot',
                email: 'test@example.com',
                subject: 'API Verification',
                message: 'This is a test message from the verification script.'
            })
        });
        const data = await res.json();
        console.log(`Contact API Status: ${res.status}`);
        console.log(`Contact API Response:`, data);
        if (res.status === 201) console.log('✅ Contact API Passed');
        else console.log('❌ Contact API Failed');
    } catch (e) {
        console.error('Contact API Error:', e.message);
    }
}

async function testAdminFlow() {
    console.log('\nTesting Admin Login & Dashboard...');
    try {
        // Login
        const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: '09Sugandh@321' })
        });

        console.log(`Login Status: ${loginRes.status}`);

        if (!loginRes.ok) {
            console.error('❌ Login Failed');
            return;
        }

        // Get Cookie
        const cookie = loginRes.headers.get('set-cookie');
        console.log(`Session Cookie received: ${cookie ? 'Yes' : 'No'}`);

        if (!cookie) {
            console.log('❌ No cookie received, cannot proceed to dashboard test.');
            return;
        }

        // Fetch Messages
        const msgRes = await fetch(`${baseUrl}/api/admin/messages`, {
            headers: {
                'Cookie': cookie
            }
        });
        const msgData = await msgRes.json();
        console.log(`Messages API Status: ${msgRes.status}`);

        if (msgRes.status === 200 && Array.isArray(msgData.messages)) {
            console.log(`✅ Messages API Passed. Found ${msgData.messages.length} messages.`);
            if (msgData.messages.length > 0) {
                console.log(`   Latest Subject: "${msgData.messages[0].subject}"`);
            }
        } else {
            console.log('❌ Messages API Failed');
        }

    } catch (e) {
        console.error('Admin Flow Error:', e.message);
    }
}

async function run() {
    await testContact();
    await testAdminFlow();
}

run();
