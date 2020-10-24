import {GET_BLOCKED_USERS,UNBLOCK_USER} from '../actions/types'

const initialState = {
    blockedUsers: []
 }

 const unblockUsers = (users,block_id) => users.filter(u => u.block_id !== block_id);

 export default (state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
         case GET_BLOCKED_USERS:
            return {
                ...state,
                blockedUsers: pl
            }

         case UNBLOCK_USER:
             return {
                 ...state,
                 blockedUsers: unblockUsers(state.blockedUsers,pl)
             } 
             
        default: 
           return state;     
     }
 } 























































