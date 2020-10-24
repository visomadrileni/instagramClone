 import {dispatchHelper} from '../utils/utils';
 import {ADD_TAG,DELETE_TAG,GET_USERS_DETAILS,GET_MUTUAL_USERS} from './types';

 export const getUserDetails = username => dispatchHelper(GET_USERS_DETAILS,'get-users-details',{username});
 export const getMutualUsers = username => dispatchHelper(GET_MUTUAL_USERS,'get-mutual-users',{username});
 
 export const deleteTag = tag => {
     return {
         type: DELETE_TAG,
         payload: tag
     }
 } 

 export const addTag = tag => {
     return {
         type: ADD_TAG,
         payload: tag
     }
 }








