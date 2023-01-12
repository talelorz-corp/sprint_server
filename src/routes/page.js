const express = require('express')
const {postUploadHandler, postPageHandler} = require('../controllers/post')
const router = express.Router()

router.use((req, res, next)=>{
    res.locals.user = null
    res.locals.followerCount = 0
    res.locals.followingCount = 0
    res.locals.followingIdList = []
    next()
})

router.post('/upload', postUploadHandler)
router.post('/getposts', postPageHandler)
router.get('/', (req, res)=> res.send('hello'))
module.exports = router