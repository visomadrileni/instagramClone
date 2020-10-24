import {dispatchHelper} from '../utils/utils';
import {GET_BLOCKED_USERS,UNBLOCK_USER} from './types';

 export const getBlockedUsers = () => dispatchHelper(GET_BLOCKED_USERS,'get-blocked-users');
 export const unblockUser = block_id => {
     return {
         type: UNBLOCK_USER,
         payload: block_id
     }
 }









