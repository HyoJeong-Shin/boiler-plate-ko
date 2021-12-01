import axios from "axios";
import {
    LOGIN_USER
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