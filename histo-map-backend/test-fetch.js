// test-fetch.js
const fetch = require('node-fetch'); // Or use global fetch in Node 18+

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('Fetch error:', err));
