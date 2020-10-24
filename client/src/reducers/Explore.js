import {GET_USERS_TO_EXPLORE,GET_PHOTOS_TO_EXPLORE,GET_GROUPS_TO_EXPLORE,GET_SUGGESTED_USERS} from '../actions/types';

const initialState = {
    users: [],
    photos: [],
    groups: [],
    suggested: []
  }
 
 export default (state=initialState,action) => {
     switch(action.type){
         case GET_USERS_TO_EXPLORE:
            return {
                ...state,
                users: action.payload
            } 

         case GET_PHOTOS_TO_EXPLORE:
             return{
                 ...state,
                 photos: action.payload
             } 
             
         case GET_GROUPS_TO_EXPLORE:
             return {
                 ...state,
                 groups: action.payload
             }    

         case GET_SUGGESTED_USERS:
             return {
                 ...state,
                 suggessted: action.payload
             }  
             
         default: 
           return state;    
     }
 }
























