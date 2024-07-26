import * as actionTypes from "../Action/type";

const UserReducer=(state={statusCode:null},action)=>{
    switch (action.type) {
        case actionTypes.SIGN_UP:
            return ;
        case actionTypes.LOGIN:
            localStorage.setItem("profile",JSON.stringify({accessToken:action.payload.data.accessToken,username:action.payload.data.username,id: action.payload.data.userid}))
            return {statusCode:action.payload.status,userid:action.payload.data.userid};
        case actionTypes.Logout:
            localStorage.removeItem("profile");
            return { statusCode: null };
        default:
            return state;
    }
}

export default UserReducer;