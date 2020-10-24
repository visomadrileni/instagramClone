import {post} from 'axios';
import {notify} from '../utils/utilMethods/handy-notification';
import {unblockUser} from '../actions/settings';
import {ObjectMssg,wait} from  './utils';
import Action from './api/Action';

/**
 * Block user
 * @param {Number} user User to block
 */
  export const blockUser = async user => {
      let {data: {message}} = await post('/api/block', {user});
      notify({ value: message})
  }

/**
 *
 * @param {Object} options
 * @param {Number} options.block_id
 * @param {String} options.username
 * @param {Function} options.dispatch
 */
 export const unBlockUser = async options => {
     let {username,block_id,dispatch} = options;
     let {data: {success,message}} = await post('/api/unblock-user',{block_id});

     if(success){
         dispatch(unblockUser(block_id));
         notify({ value: `Unblocked ${username}`})
     } else {
         notify({value: message})
     }
  } 

/**
 * Changes the password of session user
 * @param {String} old Old/Current password
 * @param {String} new_ New password
 * @param {String} new_a New password again for surety
 */
 export const changePassword = async (old,new_,new_a) => {
     let action = new Action('.c_p_btn');

     if(!old && !new_ && !new_a){
         notify({ value: 'Some value are missing'})
     } else if(new_ !== new_a){
         notify({value: 'New password does not match'})
     } else {
         action.start('Changing password ');
         wait();

         let {data: {success,message}} = await post('/user/change-password' ,{old,new_,new_a});
         if(success){
             notify({
                 value: message,
                 done: () => window.location.reload()
             })
         } else{
             notify({ value: ObjectMssg(message)});
             action.end('Change password')
         }
     }
 }

/**
 * Change user's password
 * @param {String} password User's password
 */
 export const deactivateAccount = async (password,hidePrompt) => {
     let action = new Action('.prompt-done');

     action.start('Deactivating ...');
     wait();
     let {data: {success,message}} = await post('/user/deactivate-acount', {password});
     action.end('Deactivated');

     notify({
         value: message,
         done: () => {success ? (window.location.href = '/login') : hidePrompt()}
     });
 }


















































































