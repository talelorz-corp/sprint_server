//const iconv = require('iconv-lite')
//const encodings = require('iconv-lite/encodings')
const ds = require('../src/repository/datasource')

describe('testdbConn', () => {
    let datasource = null
    beforeAll(()=>{
        datasource = ds.mysqlDatasource()
    })

    test('connecting to database', async () => {
        [rows, fields] = await datasource.query('SELECT 1')
        expect(rows.length).toBe(1)
    })

    test('simple query', async () => {
        [rows, fields] = await datasource.query('SELECT 1+1 AS `TWO`')
        expect(rows[0].TWO).toBe(2)
    })

    afterAll(()=>{
        datasource.close() //closes all connections in pool
    })
})