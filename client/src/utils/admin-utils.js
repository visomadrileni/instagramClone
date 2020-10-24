import qs from 'query-string';
import {post} from 'axios';
import {uData} from './utils'
import {notify }from '../utils/utilMethods/handy-notification';
import Action from './api/Action';


/**
 * For submit to check if user is the admin
 * @param {Object} options
 * @param {String} options.password
 * @param {String} options.search
 */
 export const adminSubmit = async options => {
     let {password,search} = options,
     toUrl = qs.parse(search),
     action = new Action('.al_submit');

     if(!password){
         notify({ value: 'Password field is missing'})
     }else{
         action.start('Please wait ...');
         let {data:{message,success}} = await post('/api/check-is-admin',{password});
         let to = toUrl.to ? toUrl.to : '/is-admin'

         notify({
             value: message,
             done: () => (success ? (window.location.href = to) : null)
         });

         action.end('Continue as admin');
     }
 } 

 /**
 * Returns if user is admin of the app
 */
 export const isAdmin = () => (uData('isadmin') === 'true' ? true : false);











































