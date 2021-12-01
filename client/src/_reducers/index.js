import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer      // 다른 파일에서 이 reducer을 쓸 수 있게 export