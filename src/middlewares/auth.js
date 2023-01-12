exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated() && req.user && req.user.userId){
        next()
    }else{
        res.status(403).send('unauthorized')
    }
}


exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated() || (req.isAuthenticated() && !req.user)){
        next()
    }else{
        res.status(401).send('user must be signed out')
    }
}