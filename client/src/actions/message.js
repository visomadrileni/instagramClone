 import {post} from 'axios';
 import {dispatchHelper} from '../utils/utils';
 import {GET_CONVERSATION,GET_CONVERSATION_MESSAGES,GET_UNREAD_MESSAGES,GET_ONLINE_USERS,GET_CON_DETAILS,
         GET_CONVERSATION_ABOUT,CONVERSATION_ADDED,MESSAGED,CHANGE_LAST_MSSG,DELETE_MESSAGE,UNSEND_ALL_MESSAGES,
         DELETE_CONVERSATION,READ_CONVERSATION,UPDATE_UNREAD_CONVERSATIONS,UPDATE_UNREAD_CONMVERSATIONS} from './types';


 export const getConversation = () => dispatchHelper(GET_CONVERSATION,'get-conversation');
 export const getConversationMessages = (con_id,when) => dispatchHelper(GET_CONVERSATION_MESSAGES,'get-conversation-messages',{con_id,when});
 export const getUnreadMessages = () => dispatchHelper(GET_UNREAD_MESSAGES,'get-unread-messages');
 export const getOnlineUsers = () => dispatchHelper(GET_ONLINE_USERS,'get-online-users');
 export const getConDetails = con_id => dispatchHelper(GET_CON_DETAILS,'get-con-details',{con_id});
 export const getConAbout = (con_id,user) => dispatchHelper(GET_CONVERSATION_ABOUT,'get-con-about',{con_id,user});
 
 export const conversationAdded = conversation => {
     return {
         type: CONVERSATION_ADDED,
         payload: conversation
     }
 }

 export const messaged = message => {
     return {
         type: MESSAGED,
         payload: message
     }
 }

 export const changeLastMssg = lastMssg => {
     return {
         type: CHANGE_LAST_MSSG,
         payload: lastMssg
     }
 }

 export const deleteMssg = message_id => {
     return {
         type: DELETE_MESSAGE,
         payload: message_id
     }
 }
 
 export const unsendAllMessages = mssg_by => {
     return {
         type: UNSEND_ALL_MESSAGES,
         payload: mssg_by
     }
 }

 export const deleteCon = con_id => {
     return {
         type: DELETE_CONVERSATION,
         payload: con_id
     }
 }

 export const readConversation = (con_id,unreadMssgs) => {
     return dispatch => {
         post('/api/read-conversation',{con_id})
          .then(() => {
              dispatch({
                  type: READ_CONVERSATION,
                  payload: con_id
              })

              if(unreadMssgs !== 0){
                dispatch({
                    type: UPDATE_UNREAD_CONVERSATIONS,
                    payload: unreadMssgs
                }) 
              }
          }).catch(e => console.log(e))
     }
 }

 export const updateUnreadConmversations = con => {
     return {
            type: UPDATE_UNREAD_CONMVERSATIONS,
            payload:con
     }
 }






























