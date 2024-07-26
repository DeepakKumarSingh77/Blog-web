import * as actionTypes from "../Action/type";

const recentReducer=(state=[],action)=>{
    switch (action.type) {
        case actionTypes.RECENTPOST:
            return action.payload.data;
        default:
            return state;
    }
}

export default recentReducer;