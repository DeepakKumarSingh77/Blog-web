import * as actionTypes from "../Action/type";


const commentReducer=(state=[],action)=>{
    switch (action.type) {
        case actionTypes.POSTCOMMENT:
            return;
        case actionTypes.GETCOMMENT:
            return action.payload;
        case actionTypes.DELETECOMMENT:
            return;
        default:
            return state;
    }
}

export default commentReducer;