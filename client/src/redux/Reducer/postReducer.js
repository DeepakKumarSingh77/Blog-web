import * as actionTypes from "../Action/type";


const postReducer=(state=[],action)=>{
    switch (action.type) {
        case actionTypes.GETPOST:
            return action.payload.data;
        case actionTypes.GETPOSTBYID:
            return action.payload.data;
        // case actionTypes.RECENTPOST:
        //     return action.payload.data;
        default:
            return state;
    }
}

export default postReducer;