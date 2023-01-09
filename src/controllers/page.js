exports.renderProfile = (req, res)=>{
    res.json({
        'user': res.locals.user,
        'followers': res.locals.followerCount,
        'followings': res.locals.followingCount,
        'followingList': res.locals.followingIdList,
    })
}

exports.renderJoin = (req, res)=>{
    res.send("renderJOIN")
}

exports.renderMain = (req, res)=>{
    const twits = []
    res.json({'twits': twits})
}