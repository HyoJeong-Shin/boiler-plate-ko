import { response } from 'express'
import React from 'react'

function LandingPage() {

    useEffect(() => {
        axios.get('api/hello')      // axios : react에서 서버(node)로 request 보낼때 사용
        .then(response => { console.log(response) })    // 서버에서 보낸 res 출력
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
