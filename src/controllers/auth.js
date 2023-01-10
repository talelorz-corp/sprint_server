const userRepository = require('../repository/userRepository')

exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated() && req.user.userId){
        next();
    }else[
        res.status(403).send(new Error('10003'))
    ]
}


exports.SNSSignUp = async (req, res)=>{
    console.log(req.user)

    //is authenticated by SNS auth provider?
    if(!req.isAuthenticated()) {
        return res.status(403).send('20003')
    }

    if(!req.user || !req.user.snsId || !req.user.provider){
        return res.status(403).send('10003')
    }

    if(req.user.userId){
        return res.status(403).send('10004')//userId is already specified
    }

    let user = {
        serviceId: null,
        userId : req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        snsId : req.user.snsId,
        provider: req.user.provider,
        gender: parseInt(req.body.gender),
    }
    //register
    try{
        await userRepository.createUser(user)
    } catch(error){
        return res.status(401).send('signup error')
    }

    res.json(user)
}