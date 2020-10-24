import {GET_GROUP_DETAILS,JOINED_GROUP,GET_GROUP_MEMBERS,GET_USER_GROUPS,GET_USERS_TO_INVITE,
    GET_USERS_TO_MAKE_ADMIN,TOGGLE_JOIN_GROUP,UPDATE_GROUP,GET_MUTUAL_AND_NEWEST_MEMBERS,
    REMOVE_MEMBER,LEFT_GROUP} from '../actions/types';

const initialState = {
     group_details: {
         group_id: null,
         name: '',
         bio: '',
         admin: null,
         admin_username: '',
         created: '',
         group_type: '',
         postsCount: 0
       },
     joined: false,
     members: [],
     mutualMembers: [],
     newestMembers: [],
     userGroups: [],
     usersToInvite: [],
     usersToMakeAdmin: []
 };

 const update = (group,{name,bio,group_type}) => {
     let updated = {
         ...group,
         name,
         bio,
         group_type
       };

       return updated;
 }

 const remMember = (members,member_id) => members.filter(m => m.grp_member_id !== member_id);
 const leftGroup = (groups,group_id) => groups.filter(g => g.group_id !== group_id);

 export default (state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
         case GET_GROUP_DETAILS:
             return {
                 ...state,
                 group_details: pl
             }

          case JOINED_GROUP:
              return {
                  ...state,
                  joined: pl
              } 
              
          case TOGGLE_JOIN_GROUP:
             return {
                 ...state,
                 joined: pl
             }     

          case UPDATE_GROUP:
             return {
                 ...state,
                 group_details: update(state.group_details,pl)
             } 
             
          case GET_GROUP_MEMBERS:
              return {
                  ...state,
                  members: pl
              }   

          case REMOVE_MEMBER:
              return {
                  ...state,
                  members: remMember(state.members,pl)
              } 
              
           case GET_MUTUAL_AND_NEWEST_MEMBERS:
               return {
                   ...state,
                   mutualMembers: pl.mutualMembers,
                   newestMembers: pl.newestMembers
               } 
               
           case GET_USER_GROUPS:
               return {
                   ...state,
                   userGroups: pl
               }    
           
           case LEFT_GROUP:
               return {
                   ...state,
                   userGroups: leftGroup(state.userGroups,pl)
               }    

           case GET_USERS_TO_INVITE:
               return {
                   ...state,
                   usersToInvite: pl
               }    

           case GET_USERS_TO_MAKE_ADMIN:
               return {
                   ...state,
                   usersToMakeAdmin: pl
               }   
         
         default: 
            return state;      
     }
 }
















































































