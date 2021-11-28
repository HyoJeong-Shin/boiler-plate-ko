if (process.env.NODE_ENV === 'production'){ // 환경 변수 이용해서 현재 어떤 환경인지 알아냄
    module.exports = require('./prod')      // 배포한 후인 production 환경일 경우
} else {
    module.exports = require('./dev')       // 로컬 환경인 development 환경일 경우
}