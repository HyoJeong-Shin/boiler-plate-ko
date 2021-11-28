const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,         // 공백 제거
        unique: 1           // 똑같은 이메일은 쓰지 못하게 함
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {                 // user가 관리자가 될 수도 있고, 일반 유저가 될 수도 있으므로 role을 줌
        type: Number,
        default: 0          // 임의로 role을 지정하지 않으면 role로 0을 줌
    },
    image: String,
    token: {                // 유효성 관리
        type: String
    },
    tokenExp: {             // token 유효기간
        type: Number
    }
})

// Schema를 model로 감싸기
const User = mongoose.model('User', userSchema)

// 이 model을 다른 파일에서도 쓰게 설정
module.exports(User)