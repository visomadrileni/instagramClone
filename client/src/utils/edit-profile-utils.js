import {post} from 'axios'
import {addTag} from '../actions/user';
import {ObjectMssg,wait} from './utils';
import {notify} from '../utils/utilMethods/handy-notification';
import Action from './api/Action';

/**
 * Add user tags
 * @param {Object} options
 * @param {String} options.value
 * @param {Number} options.user
 * @param {Function} options.dispatch
 */
 export const addUserTags = options => {
     let {value,user,dispatch} = options;
     if(value){
         dispatch(addTag({
             user,
             tag: value
         }))
     } else {
         notify({
             value: 'Please enter a tag'
         })
     }
 }

 /**
 * Edit profile
 * @param {Object} options
 * @param {String} options.susername
 * @param {String} options.semail
 * @param {Object} options.values
 * @param {String} options.values.username
 * @param {String} options.values.email
 */
 export const editProfile = async options => {
     let {susername,semail,values,values: {username,email}} = options;
     let {data: uCount} = await post('/api/what-exists',{what: 'username', value: username});
     let {data: eCount} = await post('/api/what-exists',{what: 'email', value: email});
     let action = new Action('.edit_done');
         action.start('Processing ...');
     
     if(!username){
         notify({ value: 'Username must not be empty'});
     } else if(!email){
         notify({ value: 'Email must not be empty'})
     } else if(uCount === 1 && username !== susername){
         notify({ value: 'Username already exist'})
     } else if(eCount === 1 && email !== semail){
         notify({value: 'Email already exist'})
     } else {
         let {data: {message,success}} = await post('/api/edit-profile', values);
         notify({
             value: ObjectMssg(message),
             done: () => (success ? window.location.reload() : null)
         })
     }

     action.end('Done editing');
 }

/**
 * Resend verification link
 */
 export const resend_verification = async () => {
     let action = new Action('.resend_vl',true,'sec_btn_disabled');
         action.start('Sending verification link ...');
         wait();

     notify({ value: ""});
     action.end('Resend verifcation link')    
 }

/**
 * Converts a fields object into array so we can map though 
 * the array and follow DRY pattern.
 * @param {Object} fields Fields to convert into an array
 */
 export const filedsToArray = fields => {
     let array = [];

     fields.map((index,value) => {
        array.push({
            index,
            value
          })
     })
     return array;
 }































































































































