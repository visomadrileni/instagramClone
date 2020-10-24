import {GET_NOTIFICATIONS,CLEAR_NOTIFICAIONS,GET_UNREAD_NOTIFICATIONS,READ_NOTIFICATIONS} from '../actions/types';

const initialState = {
     notifications: [],
     unreadNotifications: 0
 }

 export default (state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
         case GET_NOTIFICATIONS:
             return {
                 ...state,
                 notifications: pl
             }

          case CLEAR_NOTIFICAIONS:
              return {
                  ...state,
                  notifications: []
              }    

          case GET_UNREAD_NOTIFICATIONS:
              return {
                  ...state,
                  unreadNotifications: pl
              } 
              
          case READ_NOTIFICATIONS:
              return {
                  ...state,
                  unreadNotifications: 0
              }     

        default: 
             return state;      
     }
 }


























