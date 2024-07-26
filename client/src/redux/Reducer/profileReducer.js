import * as actionTypes from "../Action/type";

const profileReducer=(state=[],action)=>{
    switch (action.type) {
        case actionTypes.GETALLUSER:
            return action.payload.data;
        case actionTypes.GETUSERBYID:
            return action.payload.data;
        case actionTypes.SAVEABOUT:
            return action.payload.data;
        case actionTypes.PROFILEIMAGE:
            return ;
        default:
            return state;
    }
}

export default profileReducer;