const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10       // salt가 몇자리인지 나타냄

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

// mongoose 메소드 pre 사용     // index.js의 register route에서 user.save하기 전에 function 실행
userSchema.pre('save', function( next ){
    var user = this     // userSchema 가르킴

    if(user.isModified('password')){    // 비밀번호가 변환될 때만 비밀번호 암호화   // 이메일, 이름 등 기타 정보 변경때는 실행되지 않음
        // 비밀번호 암호화 시키기
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){       // hash : 비밀번호 암호화 시킴, 시킨 것
                if(err) return next(err)
                user.password = hash    // 비밀번호 암호화에 성공하면 암호화된 비밀번호로 바꿔줌
                next()      // index.js로 돌아감
            })
        })

    }
})

// Schema를 model로 감싸기
const User = mongoose.model('User', userSchema)

// 이 model을 다른 파일에서도 쓰게 설정
module.exports = {User}