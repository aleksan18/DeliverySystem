/**
* generates pool connection to be used throughout the app
*/
require("dotenv").config();
const { createPool, createConnection } = require("mysql");

let pool
/**
 * An initialization method for a pool of connections to the database.
 * Everytime a query is requested 1 connection is given for usage and then released
 * upon query completion or failure.
 */
const init = () => {
  try {
    pool = createPool({
      connectionLimit: process.env.MY_SQL_DB_CONNECTION_LIMIT
        ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT)
        : 4,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error("[mysql.connector][init][Error]: ", error);
    throw new Error("failed to initialized pool");
  }
};
/**
 * An assistance function which executes 1 query to the database within a transaction if an error occurs it rolls back the `query`
 * @param {connection} connection Connection received from a pool of requests 
 * @param {String} query A string `query` for database execution
 * @param { String[] | object} params An array of values which will we passed to the `query` and put in the positions of `?` which are in the `query` string.
 * @returns The values from the database will be retrived and returned
 */
const individualQuery = (connection, query,params) => {
  let returnValue;
  connection.query(query,params,(err,results) => {
    if (err) {          //Query Error (Rollback and release connection)
      console.log(err);
      connection.rollback(function() {
        connection.release();
        //Failure
      });
    } else {
      connection.commit((err)=> {
        if (err) {
          console.log(err);
          connection.rollback(() =>{
            connection.release();
            //Failure
        });
        } else {
          console.log(results);
          returnValue=results;
          //Success
        }
      })
    }
  })
return returnValue;
}
  /**
   * A function which is used for executing multiple queries within a transaction
   * @param {String[]} queries Array of mysql queries that will be executed within a transaction. These can contain `?`s
   *                              which will be replaced with values in `params`.
   * @param {Array[]} params An array of arrays that is the same length as `queries`.
   * Each array in `params` should contain values to replace the `?`s in the corresponding query in `queries`. If a query has no `?`s, an empty array should be provided.
   * @returns A Promise that is fulfilled with an array of the
   *                              results of the passed in queries. The results in the
   *                              returned array are at respective positions to the
   *                              provided queries.
   */
const executeTransaction = (
  queries = Array(String),
  params = Array(Array),
) => {
  try {  
    if (!pool){
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );
    }
    if (queries.length !== params.length) {
      return Promise.reject(
          'Number of provided queries did not match the number of provided query values arrays'
      )
    }
    return new Promise((resolve, reject) => { 
      const results=[];
      if (!pool)
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );
      pool.getConnection((err,connection)=>{
        if(err){
          console.error(err);
          throw new Error("failed to execute MySQL query");
        }  
        connection.beginTransaction((error)=>{
          if(error){
            connection.rollback(()=>{
              console.log(error);
              console.log("ERROR HAS OCCURED WITHIN THE TRANSACTION");
              connection.release();
              reject(error)
            })
          }else{
            queries.forEach((element,index) => {
              console.log(params[index]);
              results.push(individualQuery(connection, element,params[index]));
            });
            resolve(results);
          }

        })
      })
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | object} params - provide the parameterized values used
 * @return {Promise} Returns a promise of the same type as the provided model type in the query
 * 
 */
const execute = (
  query = String,
  params = Array(String) | object,
) => {
  try {
    if (!pool)
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );

    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};

module.exports = {
  init,
  execute,
  executeTransaction,
}