import {GET_CONVERSATION,GET_CONVERSATION_MESSAGES,GET_UNREAD_MESSAGES,GET_ONLINE_USERS,GET_CON_DETAILS,CONVERSATION_ADDED,
        DELETE_CONVERSATION,DELETE_MESSAGE,CHANGE_LAST_MSSG,READ_CONVERSATION,UNSEND_ALL_MESSAGES,MESSAGED,
        GET_CONVERSATION_ABOUT,UPDATE_UNREAD_CONMVERSATIONS} from '../actions/types';

const initialState = {
    conversations: [],
    messages: [],
    conAbout: [],
    unreadMessages: 0,
    onlineUsers: [],
    conDetails: {
        con_with: null,
        con_with_username: '',
        con_with_firstname: '',
        con_with_surname: '',
        isOnline: 'no',
        lastOnline: ''
    }
 }

 const addCon = (cons,con) => {
    cons = [...cons,con]
    return cons;
 }

 const message = (messages,message) => {
     messages = [...messages,message];
     return messages;
 }

 const changeLastMsgg = (conversations, mssgDetails) => {
     return conversations.map(c => {
         if(c.con_id === mssgDetails.con_id){
             c.lastMssg = mssgDetails.lastMssg
         }
         return c;
     })
 } 

 const readCon = (cons,con_id) => {
     return cons.map(c => {
         if(c.con_id === con_id){
             c.unreadMessages = 0;
         }
         return c;
     })
 }

 const deleteMssg = (messages,message_id) => messages.filter(m => m.message_id !== message_id);
 const unsendAllMssgs = (messages,mssg_by) => messages.filter(m => m.mssg_by !== mssg_by);
 const deleteConversation = (cons,con_id) => cons.filter(c => c.con_id !== con_id);

 export default (state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
         case GET_CONVERSATION:
             return {
                 ...state,
                 conversations: pl
             }

          case CONVERSATION_ADDED:
              return {
                  ...state,
                  conversations: addCon(state.conversations,pl)
              }    
           
           case GET_CONVERSATION_MESSAGES:
               return {
                   ...state,
                   messages: pl
               }   

           case MESSAGED:
               return {
                   ...state,
                   messages: message(state.messages,pl)
               }  
               
            case CHANGE_LAST_MSSG:
                return {
                    ...state,
                    conversations: changeLastMsgg(state.conversations,pl,'user')
                }
                
             case DELETE_MESSAGE:
                 return {
                     ...state,
                     messages: deleteMssg(state.messages,pl)
                 }  
                 
              case UNSEND_ALL_MESSAGES:
                  return {
                      ...state,
                      messages: unsendAllMssgs(state.messages,pl)
                  }    

              case DELETE_CONVERSATION:
                  return {
                      ...state,
                      conversations: deleteConversation(state.conversations,pl)
                  }    
                  
              case GET_CONVERSATION_ABOUT:
                  return {
                      ...state,
                      conAbout: pl
                  }  
               
               case GET_UNREAD_MESSAGES:
                   return {
                       ...state,
                       unreadMessages: pl
                   }   

               case READ_CONVERSATION:
                   return {
                       ...state,
                       conversations: readCon(state.conversations,pl)
                   }    

                case UPDATE_UNREAD_CONMVERSATIONS:
                    return {
                        ...state,
                        unreadMessages: state.unreadMessages - pl.con
                    }   

                case GET_ONLINE_USERS:
                    return{
                        ...state,
                        onlineUsers: pl
                    }   
                
                case GET_CON_DETAILS:
                    return {
                        ...state,
                        conDetails: pl
                    } 
                    
           default:
               return state;         
     }
 }


























































