const pg = require('pg')
//const pool = new pg.pool(
//    max: 5,
//    min: 1
//)

const run = async () =>{
    const id = 1
    const sql = 'SELECT * FROM pokemon WHERE id = $1::int'

  //  return pool.query(sql, [id])
  //      .then(result => {
  //          console.log(result.rows)
  //      })

  run()
}