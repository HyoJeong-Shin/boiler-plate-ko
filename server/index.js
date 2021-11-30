const express = require('express')  // 다운 받은 express module을 가져옴
const app = express()               // function을 이용해서 새로운 express 앱을 만듦
const port = 5000                   // 백서버 port : 5000
//const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')  // User 가져옴

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 함
//app.use(bodyParser.urlencoded({extended: true}))

// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 함
//app.use(bodyParser.json())

app.use(express.json())     // For json requests
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())     // cookieParser 사용

//mongoose 이용해서 몽고DB와 앱 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => { res.send('Hello World!')})    // root 디렉터리에 hello world 출력

// /api/hello 요청을 받으면 'Hello World!~~' 보내줌
app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))

// 회원가입을 위한 route    // Register Route
app.post('/api/users/register', (req, res) => {

    // 회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
    // bodyParser를 이용해서 req.body로 클라이언트가 보내는 정보를 받아줌
    const user = new User(req.body)

    // 정보들이 user모델에 저장  // 몽고디비 메소드
    user.save((err, userInfo) => {
        if (err) return res.json({ sucesss: false, err })   // 실패시(에러 발생시) json형식으로 실패 정보 리턴
        return res.status(200).json({                   // res.status(200) = 성공시
            success: true
        })
    })
})

// login route
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾기
    User.findOne({ email: req.body.email }, (err, user) => {    // 요청된 이메일 = 찾고자 하는 이메일 = req.body.email
        if(!user) {     // 이메일을 가진 유저가 없다면 (해당 이메일이 없다면)
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {     // 로그인 페이지에 입력한 비밀번호 : req.body.password (Plainpassword임)  // (eer, isMatch) =>{} 는 callback function임
            if(!isMatch)    // 비밀번호가 같지 않을 때 (틀렸을 때)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            
            // 비밀번호까지 맞다면 토큰을 생성하기
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)        //status400 : 에러있음
                
                // 토큰 저장 (쿠키, 로컬스토리지 등에 저장 가능하고, 이 코드는 쿠키에 저장하는 코드)
                res.cookie("x_auth", user.token)
                .status(200)    // 성공
                .json({ loginSuccess: true, userId: user._id })
            })

        })  
    })
    
})


// auth route   // auth : middleware로, auth가 false 즉, 통과하지 못하면 이 안 코드는 실행되지 않음
app.get('/api/users/auth', auth, (req, res) => {
    
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True
    res.status(200).json({  // json형태로 client에 정보 제공   => 정보를 주면 어떤 페이지에서든지 유저 정보를 이용가능하므로 편리해짐
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,    // 관리자인지 아닌지  role 0이면 일반유저, 0이 아니면 관리자    // role1 어드민, role2 특적 부서 어드민 등으로 설정도 가능
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// logout route
app.get('/api/users/logout', auth, (req, res) => {
    // 로그아웃 하려는 유저를 db에서 찾고 업뎃
    User.findOneAndUpdate({ _id: req.user._id},
        { token : "" }         // 토큰 지움
        , (err, user) => {
            if(err) return res.json({ success: false, err})
            return res.status(200).send({
                sucesss: true
            })
        })
})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) })    // port 5000번에서 앱 실행