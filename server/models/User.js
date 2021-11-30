const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10       // salt가 몇자리인지 나타냄
const jwt = require('jsonwebtoken');

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
        maxlength: 70       // 비밀번호 암호화 과정 고려해서 length 늘리기
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

    } else {    // 비밀번호가 아닌 다른 것을 바꿀 때
        next()
    }
})

// comparePassword 메소드 만들기
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234       데이터베이스에 저장되어 암호화된 비밀번호 $2b$10$/kYmZYie44A8IaTpj4US6u3VHvF0k0C1RgNRKgeGcLZxzETZ1gW4K   이 두 개가 같은지 체크
    // 암호화된 비밀번호를 복구화할 수 없으니 plainpassword(입력된 비밀번호)를 암호화 시킨 후 DB에 있는 비밀번호와 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;

    // jsonwebtoken을 이용해서 token 생성   // 첫번째 매개변수 String이어야 하는데 user._id는 string이 아니니 toHexString()을 이용해 변경
    var token = jwt.sign(user._id.toHexString(), 'secretToken')       // uesr._id : 데이터베이스에 있는 id    // 두 가지 이용해서 토큰 만듦 : user._id + 'secretToken' =token

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)  
        cb(null, user)      // save 잘되면, err없고 user 정보 전달
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this

    // 토큰을 decode함
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user){
            if (err) return cb(err)
            cb(null, user)  // err없으면 user 정보 전달
        })
    })
}


// Schema를 model로 감싸기
const User = mongoose.model('User', userSchema)

// 이 model을 다른 파일에서도 쓰게 설정
module.exports = {User}