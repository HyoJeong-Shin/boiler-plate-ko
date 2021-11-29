const { User } = require("../models/User")

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // Client cookie에서 token을 가져옴     // cookie-parser를 이용
    let token = req.cookies.x_auth

    // token을 decode(복호화)한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.json({ isAuth: false, error: true})        // user가 없다면
        
        // user가 있다면  request에 토큰과 유저 넣어줌 => index.js에서 유저, 토큰 정보를 가질 수 (사용할 수) 있게 됨
        req.token = token
        req.user = user
        next()      // Middleware 다음으로 넘어갈 수 있게 함
    })

    // 유저가 있으면 인증 okay

    // 유저가 없으면 인증 no
}

module.exports = { auth }