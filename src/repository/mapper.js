const sqlMapper = require("mybatis-mapper")
const path = require('path')
const sqlMapperPath = path.join(__dirname, '../../resources/mappers')
const sqlMapperPath2 = './resources/mappers/'
var registeredMappers = []

exports.getMapper = (name) => {
    if(!registeredMappers.includes(name)){
        sqlMapper.createMapper([sqlMapperPath2 + name + '.xml'])
        registeredMappers.push(name)
    }
    //curry-like
    return {
        makeQuery: (queryId, params) => {
            return sqlMapper.getStatement(name, queryId, params, {
                language: "sql",
                indent: "  ",
              })
        }
    }
}

