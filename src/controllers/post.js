const postRepository = require('../repository/postRepository')
const tagRepository = require('../repository/tagRepository')

exports.postUploadHandler = async(req, res, next) => {
    console.log('request: ', req.body)
    
    if(!req.user.userId || !req.body.content){
        throw new Error('userId and content must not be null')
    }
    try{
        let createdPost = {}
        createdPost.postId = await postRepository.createPost(req.body.content, req.user.userId)
        if(req.body.taggedUsers && req.body.taggedUsers.length() > 0){
            createdPost.taggedUsers = await tagRepository.addUserTags(postid, req.body.taggedUsers)
        }
        if(req.body.hashtags && req.body.hashtags.length() > 0){
            createdPost.hashtags = await tagRepository.addHashtags(postid, req.body.hashtags)
        }
        res.json(createdPost)
    } catch(error){
        throw res.status(500).send(error)
    }
}

//retrive posts with cursor pagination
//possibly add conditions on creator and hashtags?
exports.PostPageHandler = async(req, res, next)=>{
    if(!req.body.timecursor || !req.body.limit){
        throw new Error('fromtime and limit cannot be null')
    }
    console.log("[PostPageHandler] page from: ", req.body.timecursor, "id: ", req.body.idcursor, "limit: ", req.body.limit)
    try{
        let posts = await postRepository.getPosts(req.body.timecursor, req.body.idcursor, req.body.limit)
        res.json(posts)
    }catch(error){
        throw res.status(500).send(error)
    }
}