const { execute } = require("../database/mysql.connector.js");

const getDateInSqlFormat = (date) => {
    console.log("date: ", date)
    console.log("typeof date: ", typeof date)
    if (date instanceof Date && !isNaN(date)) {
        const year = date.getFullYear()
        const month = ((date.getMonth() + 1) >= 10) ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
        const day = (date.getDate() >= 10) ? `${date.getDate()}` : `0${date.getDate()}`
        const hours = (date.getHours() >= 10) ? `${date.getHours()}` : `0${date.getHours()}`
        const minutes = (date.getMinutes() >= 10) ? `${date.getMinutes()}` : `0${date.getMinutes()}`
        const seconds = (date.getSeconds() >= 10) ? `${date.getSeconds()}` : `0${date.getSeconds()}`
        // Date format that Mysql expects to receive: YYYY-MM-DD HH:MI:SS 
        const res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        console.log("getDateInSqlFormat: ", res)
        return res
    } else {
        return null
    }
}

module.exports ={
    getDateInSqlFormat
}
