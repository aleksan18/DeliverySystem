import neo4j from 'neo4j-driver'

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'root'));
var session = driver.session();

export default session
