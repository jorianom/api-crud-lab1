const app = require('./src/app.js');
const pool = require('./src/pool');
pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'lab1',
    user: 'postgres',
    password: 'JRima@1199'
})
    .then(() => {
        app().listen(3005, () => {
            console.log('Listening on port 3005');
        });
    })
    .catch((err) => console.error(err));

