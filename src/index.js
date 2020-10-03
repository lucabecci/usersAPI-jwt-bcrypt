const app = require('./app');
require('./database/database')
const PORT = 3000;
async function main(){
    await app.listen(3000)
    console.log('server on port', PORT)
}

main();