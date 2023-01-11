exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated() && req.user && req.user.userId){
        next()
    }else{
        res.status(403).send('unauthorized')
    }
}
