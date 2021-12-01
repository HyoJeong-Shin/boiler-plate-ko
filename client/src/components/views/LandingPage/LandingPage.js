import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

    useEffect(() => {
        axios.get('api/hello')      // axios : react에서 서버(node)로 request 보낼때 사용
        .then(response => { console.log(response) })    // 서버에서 보낸 res 출력
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'
                    , width: '100%', height: '100vh'
        }}> 
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
