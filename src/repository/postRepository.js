const ds = require('./datasource')
const {getMapper} = require('./mapper')

const datasource = ds.mysqlDatasource()
const mapper = getMapper('postMapper')

exports.getPosts = async (timecursor, idcursor, limit)=>{
    let posts = []

    const query = mapper.makeQuery('findPostsInRange', timecursor, idcursor, limit)
    const [rows, fields] = await datasource.query(query)
    console.log(rows, fields)

    if(rows) posts = rows[0]
    return posts
}

exports.createPost = async(content, userId) => {
    //validation
    if(!userId || !content){
        throw new Error('content and userId must not be null')
    }

    /*
    const hashtag_query = mapper.makeQuery('createOrFindHashtags',{
        hashtags: hashtags
    })

    try{
        [res, fields] = await datasource.query(query)
        hashtags = res
    } catch(error){
        console.error(error)
        throw new Error('createPost-query-failed')
    }
    */

    //query
    const query = mapper.makeQuery('createPost', 
    {
        content: content,
        userId: userId,
    })

    
    try{
        await datasource.query(query)
        const [rows, fields] = await datasource.query('SELECT last_insert_id();')
        console.log('registered postid #', rows[0]['last_insert_id()'])
        if(!rows) return null
        return rows[0]['last_insert_id()']
    } catch(error){
        console.error(error)
        throw new Error('createPost-query-failed')
    }

    
    return null
}

exports.findUserSNS = async(snsId, provider) => {
    query = mapper.makeQuery('findUserSNS', {snsId: snsId, provider: provider})
    const [rows, fields] = await datasource.query(query)
    if(rows) return rows[0]

    return null
}

exports.deleteAll = async ()=>{
    await datasource.query('DELETE FROM `talelorz`.`posts`')
    return true
}

exports.setProfile = async(profile) => {
    const query = mapper.makeQuery('setProfile', {})
    return null
}


/******* unit tests only *******/
exports.close = ()=>{
    datasource.close()
}