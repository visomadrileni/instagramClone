import {dispatchHelper} from '../utils/utils';
import {GET_GROUP_DETAILS,JOINED_GROUP,GET_GROUP_MEMBERS,GET_USER_GROUPS,GET_USERS_TO_INVITE,
        GET_MUTUAL_AND_NEWEST_MEMBERS,GET_USERS_TO_MAKE_ADMIN,TOGGLE_JOIN_GROUP,UPDATE_GROUP,
        REMOVE_MEMBER,LEFT_GROUP} from './types';


 export const getGroupDetails = grp_id => dispatchHelper(GET_GROUP_DETAILS,'get-group-details',{grp_id});
 export const joinedGroup = group => dispatchHelper(JOINED_GROUP,'joined-group',{group});
 export const getGroupMembers = grp_id => dispatchHelper(GET_GROUP_MEMBERS,'get-group-members',{grp_id});
 export const getUserGroups = user => dispatchHelper(GET_USER_GROUPS,'get-user-groups',{user});
 export const getUsersToInvite = () => dispatchHelper(GET_USERS_TO_INVITE,'get-users-to-invite');
 export const getMutualsAndNewestMembers = grp_id => dispatchHelper(GET_MUTUAL_AND_NEWEST_MEMBERS,'get-mutuals-and-newest-members',{grp_id});
 export const getUsersToMakeAdmin = grp_id => dispatchHelper(GET_USERS_TO_MAKE_ADMIN,'get-users-to-make-admin',{grp_id});

 export const toggleJoinGroup = j => {
     return {
         type: TOGGLE_JOIN_GROUP,
         payload: j
     }
 }
 
 export const updateGroup = gd => {
     return {
         type: UPDATE_GROUP,
         payload: gd
     }
 }

 export const removeMember = member_id => {
     return {
         type: REMOVE_MEMBER,
         payload: member_id
     }
 }

 export const leftGroup = group_id => {
     return {
         type: LEFT_GROUP,
         payload: group_id
     }
 }























































