const { express } = require('express')
const {getMapper} = require('../src/repository/mapper')
const ds = require('../src/repository/datasource')
describe('testquery', () => {
    let datasource = null
    beforeAll(()=>{
        datasource = ds.mysqlDatasource()
    })
    //fetching
    test('fetch a mapper from the mappers directory', async () => {
        //given
        const mapper = getMapper('userMapper')
        const mockUser = {
            userId : 1,
            username: "Alice",
        }

        const query = mapper.makeQuery('createUser', mockUser)
        await datasource.query(query)

        //test
        const [rows, fields] = await datasource.query('SELECT * FROM `talelorz`.`users`')
        console.log(rows, fields)
        expect(rows[0].userId).toEqual(mockUser.userId)
        expect(rows[0].username).toEqual(mockUser.username)

        //after
        await datasource.query('DELETE FROM `talelorz`.`users`')
    })
    afterAll(()=>{
        datasource.close() //closes all connections in pool
    })
})

