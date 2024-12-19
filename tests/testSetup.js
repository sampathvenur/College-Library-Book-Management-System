const app = require('../src/app'); 
const server = require('http').createServer(app); 

module.exports = async () => {
  return new Promise((resolve, reject) => {
    server.listen(3001, () => { 
      console.log('Test server listening on port 3001'); 
      resolve(); 
    }).on('error', (err) => { 
      reject(err); 
    });
  });
};