import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {

    const dispatch = useDispatch();

    // 컴포넌트 안에서 데이터 변화 시킬 때 state 이용   // state을 만든 후 value에 넣어주면 됨
    // 단축어 : useState으로 아래 문장 빠르게 작성가능 
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {             // 해당 이벤트를 설정함으로써 data 입력이 가능해짐
        setEmail(event.currentTarget.value)         // email state을 바꿔주는 코드  
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {        // l ogin 버튼 클릭 시 일어나는 이벤트
        event.preventDefault();          // 기존 default event 막음 -> why? 버튼 누르면 refresh 자동으로 일어나 우리가 해야할 일들을 못하게 됨
        
        // server에 보내고자 하는 값들을 state에서 갖고 있음
        let body = {
            email: Email, 
            password: Password
        }

        // dispatch를 이용해서 action을 취함  // action 이름 : loginUser
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){  // login 성공하면 root페이지(LandingPage)로 이동
                    props.history.push('/')         // react에서 페이지 이동하는 법
                } else {
                    alert('Error')
                }
            })

        
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'
                        , width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
