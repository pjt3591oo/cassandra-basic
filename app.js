const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',    // SELECT data_center FROM system.local;
  keyspace: 'test',                  // database name
})


// client.execute(query, [])
//   .then(result => console.log(result.rows));
async function main() {
  const insertQuery = `INSERT INTO post (id, title) VALUES(3, 'test')`
  const insertResult = await client.execute(insertQuery);
  console.log(insertResult);

  const query = 'SELECT * FROM post';
  const result = await client.execute(query, []);
  console.log(result.rows);
}

main();