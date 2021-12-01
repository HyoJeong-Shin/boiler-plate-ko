import React , {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'


export default function(SpecificComponent, option, adminRoute = null){

    // option
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지   (login페이지, register페이지 등)

    // adminRoute
    // true => admin 유저만 들어가길 원함


    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){    // admin이 아닌 경우
                        props.history.push('/')         // 못 들어가게 함 (landingpage로 보냄)
                    } else{
                        if(option === false){   // 로그인한 유저는 출입 불가능한 페이지일 경우
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} />
        )
    }

    return AuthenticationCheck
}