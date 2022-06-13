const neo4j = require('neo4j-driver')
const {uri, user, password} = require('./neo4jcredentials.js')


const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

module.exports = session
