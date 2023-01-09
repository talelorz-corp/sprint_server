const mysql = require('mysql2/promise')
const config = require('../../config/config')
let pool = null


exports.mysqlDatasource = ()=>{
    if(pool === null) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: config.user,
            password: config.pw,
            database: 'talelorz',
        })
        console.log('mysql db init!')
    }
    return {
        query: (query) =>{
            if(query === null) return null
            return pool.query(query)
        },
        close: ()=>{
            pool.end()
        }
    }
}