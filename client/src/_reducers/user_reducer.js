import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types';

export default function (state = {}, action) {
    // reducer에서 previousState과 action을 조합해서 다음 nextState을 만들어줌
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }   // reducer에 backend에서 가져온 정보(request)를 action.payload 써서 넣어줌
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload}
            break;
        default:
            return state;
    }
}