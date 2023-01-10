const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv')
const nunjucks = require('nunjucks')
const authRouter = require('./src/routes/auth')
const pageRouter = require('./src/routes/page');
const passport = require('passport')
const passportConfig = require('./src/passport')
dotenv.config()
const app = express();

/********* app setup  *******/

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'html')
nunjucks.configure('src/views', {
    express: app,
    watch: true,
})
passportConfig()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
}))
app.use(passport.initialize())
app.use(passport.session())
/********* routes  *******/

app.use('/', pageRouter)
app.use('/auth', authRouter)



app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} missing a router`)
    error.status = 404
    next(error)
})

/********* default error handlers  *******/
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.status(err.status || 500)
    
    res.send('something wrong')
})


/********* start app: port is by default 3000 *******/

app.listen(app.get('port'), ()=>{
    console.log('app running on port ', app.get('port'))
})