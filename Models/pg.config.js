const Pool = require('pg').Pool;

const pg_conn = new Pool({
  user: 'grlczirdfahgtv',
  host: 'ec2-52-21-136-176.compute-1.amazonaws.com',
  database: 'd6rcbh7896fufg',
  password: 'd9aced845a631522f8e7b47fc95f280a982a709f5ccafa0f41c8690618483000',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
})

module.exports = pg_conn;