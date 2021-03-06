import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    // server에 보낼 때 사용하는 명령어
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)          // server에서 받은 data를 request에 저장  // request : 백엔드에서 가져온 모든 data

    return{         // Action : object에서 무슨 일이 일어났는지 설명
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    // server에 보낼 때 사용하는 명령어
    const request = axios.post('/api/users/register', dataToSubmit) // data 보내면 백엔드에서 처리해서 줌
        .then(response => response.data)          // server에서 받은 data를 request에 저장  // request : 백엔드에서 가져온 모든 data

    return{         // Action : object에서 무슨 일이 일어났는지 설명
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit) {
    // server에 보낼 때 사용하는 명령어
    const request = axios.get('/api/users/auth') // data 보내면 백엔드에서 처리해서 줌
        .then(response => response.data)          // server에서 받은 data를 request에 저장  // request : 백엔드에서 가져온 모든 data

    return{         // Action : object에서 무슨 일이 일어났는지 설명
        type: AUTH_USER,
        payload: request
    }
}