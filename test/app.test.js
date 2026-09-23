const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');

async function testHomePage() {
  const response = await request(app).get('/');

  assert.strictEqual(response.status, 200);
  assert.match(response.headers['content-type'], /^text\/html/);
  assert.strictEqual(response.text, 'Hello World!');

  console.log('✓ GET / returns HTTP 200 and Hello World!');
}

testHomePage().catch((error) => {
  console.error('GET / test failed:');
  console.error(error);
  process.exitCode = 1;
});
