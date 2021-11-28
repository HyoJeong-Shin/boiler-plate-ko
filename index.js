const express = require('express')  // 다운 받은 express module을 가져옴
const app = express()               // function을 이용해서 새로운 express 앱을 만듦
const port = 5000                   // 백서버 port : 5000
//const bodyParser = require('body-parser');

const config = require('./config/key')

const {User} = require('./models/User');  // User 가져옴

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 함
//app.use(bodyParser.urlencoded({extended: true}));

// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 함
//app.use(bodyParser.json());

app.use(express.json())     // For json requests
app.use(express.urlencoded({extended: true}))

//mongoose 이용해서 몽고DB와 앱 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => { res.send('Hello World!')})    // root 디렉터리에 hello world 출력

// 회원가입을 위한 route
app.post('/register', (req, res) => {

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

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) })    // port 5000번에서 앱 실행