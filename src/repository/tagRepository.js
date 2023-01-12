const ds = require('./datasource')
const {getMapper} = require('./mapper')

const datasource = ds.mysqlDatasource()
const mapper = getMapper('postMapper')

exports.addUserTags = async(postId, targetUsers) => {
    //validation
    if(!postId || !targetUsers){
        throw new Error('postid and target_users must not be null')
    }


    //query
    const query = mapper.makeQuery('addUserTags', 
    {
        postId: postId,
        targetUserId: targetUsers,
    })


    try{
        await datasource.query(query)
    } catch(error){
        console.error(error)
        throw new Error('add-user-tags-query-failed')
    }
    let succeededUsers = targetUsers
    return succeededUsers
}

exports.addHashtags = async(postId, hashtags)=> {
    //validation
    if(!postId || !hashtags){
        throw new Error('postid and hashtags must not be null')
    }

    //query
    const hashquery = mapper.makeQuery('createHashtags', {
        hashtags: hashtags,
    })

    try{
        await datasource.query(hashquery)
    } catch(error){
        console.error(error)
        throw new Error('create-or-find-hashtags-query-failed')
    }

    const query = mapper.makeQuery('addHashtags', {
        postId: postId,
        hashtags: hashtags,
    })
    console.log('tag query:', query)

    try{
        await datasource.query(query)
    } catch(error){
        console.error(error)
        throw new Error('add-hashtags-query-failed')
    }
    return hashtags
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