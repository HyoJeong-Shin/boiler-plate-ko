const express = require('express')  // 다운 받은 express module을 가져옴
const app = express()               // function을 이용해서 새로운 express 앱을 만듦
const port = 5000                   // 백서버 port : 5000

//mongoose 이용해서 몽고DB와 앱 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyojeong:gywjddl66@boilerplate.nntfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})    // root 디렉터리에 hello world 출력

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})    // port 5000번에서 앱 실행