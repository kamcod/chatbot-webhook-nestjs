const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const WEBHOOK_URL = `${BASE_URL}/webhook`;
const CHAT_WEBHOOK_URL = `${BASE_URL}/webhook/chat`;

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url.replace('http://localhost:3000', ''),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('🏥 Testing health check...');
  try {
    const response = await makeRequest(WEBHOOK_URL, 'GET');
    console.log('✅ Health check response:', response.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
}

async function testGeneralWebhook() {
  console.log('\n📡 Testing general webhook...');
  const testData = {
    message: 'Hello from test script!',
    userId: 'test-user-123',
    sessionId: 'test-session-456',
    data: { testKey: 'testValue', timestamp: new Date().toISOString() }
  };

  try {
    const response = await makeRequest(WEBHOOK_URL, 'POST', testData);
    console.log('✅ General webhook response:', response.data);
  } catch (error) {
    console.log('❌ General webhook failed:', error.message);
  }
}

async function testChatWebhook() {
  console.log('\n💬 Testing chat webhook...');
  const testData = {
    message: 'This is a test chat message from the user',
    userId: 'chat-user-789',
    sessionId: 'chat-session-101',
    timestamp: new Date().toISOString()
  };

  try {
    const response = await makeRequest(CHAT_WEBHOOK_URL, 'POST', testData);
    console.log('✅ Chat webhook response:', response.data);
  } catch (error) {
    console.log('❌ Chat webhook failed:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting webhook tests...\n');
  
  await testHealthCheck();
  await testGeneralWebhook();
  await testChatWebhook();
  
  console.log('\n✨ Tests completed!');
}

// Check if server is running first
async function checkServer() {
  try {
    await makeRequest(WEBHOOK_URL, 'GET');
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running!');
    console.log('Please start the server first with: npm run start:dev');
    console.log('Then run this test script again.');
    return;
  }
  
  await runTests();
}

main().catch(console.error); 