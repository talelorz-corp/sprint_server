const ds = require('./datasource')
const {getMapper} = require('./mapper')

const datasource = ds.mysqlDatasource()
const mapper = getMapper('userMapper')

exports.findUser = async (serviceId, ...otherArgs)=>{
    let user = null

    
    const query = mapper.makeQuery('getUser', serviceId)
    const [rows, fields] = await datasource.query(query)
    console.log(rows, fields)

    if(rows) user = rows[0]
    return user
}

exports.createUser = async(user) => {
    //validation
    if(user.serviceId === null && user.snsId === null){
        throw new Error('incomplete-user-object')
    }
    else if(user.snsId && (user.provider === null)) {
        throw new Error('incomplete-user-object')
    }
    else if(user.firstName === null || user.lastName === null || user.gender === null){
        throw new Error('incomplete-user-object')
    }
    //query
    let query = mapper.makeQuery('createUser', 
    {
        serviceId: user.serviceId, //for local id
        snsId: user.snsId, //auth string from snsId
        provider: user.provider,
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
    })
    try{
        await datasource.query(query)
    } catch(error){
        console.error(error)
        throw new Error('createUser-query-failed')
    }

    return true
}

exports.findUserSNS = async(snsId, provider) => {
    query = mapper.makeQuery('findUserSNS', {snsId: snsId, provider: provider})
    const [rows, fields] = await datasource.query(query)
    if(rows) return rows[0]

    return null
}

exports.deleteAll = async ()=>{
    await datasource.query('DELETE FROM `talelorz`.`users`')
    return true
}

exports.setProfile = async(profile) => {
    const query = mapper.makeQuery('setProfile', {})
    return null
}
exports.findUserTest = (serviceId, ...otherArgs)=>{
    return null
}

/******* unit tests only *******/
exports.close = ()=>{
    datasource.close()
}