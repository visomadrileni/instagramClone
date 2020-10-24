import axios,{post} from 'axios';
import {notify} from '../utils/utilMethods/handy-notification';
import {getUserDetails,getMutualUsers} from '../actions/user';
import {isFollowing,getUserStats} from '../actions/follow';
import {getUserPosts,getGroupPosts} from '../actions/post';
import {getGroupDetails,joinedGroup} from  '../actions/group';
import Compress from 'image-compressor.js';
import d from './api/Dom';

/**
 *  Shortens what with string length
 * @param {String} what
 * @param {Number} length
 */
export const shortener = (what,length) => {
    let parse = parseInt(length),
    len = what.length;

    if(!parse){
        return
    }

    return len >= parse ? `${what.substr(0,length -2)} ..` : (len < parse ? what : null)
}

/**
 * Returns data stored in dataset,(The data() method allows us to attach data of any type 
 * to DOM elements in a way that is safe from circular)
 *  references and therefore from memory leaks.
 * @param {String} what Which data
 */
 export const uData = what => new d('.data').data(what);

/**
 * Returns unique string, useful for key
 * the random number we convert to hexdecimal value and with 
 * slice() start from element in position(i=3,4,5....)
 */
 export const uniq = () => Math.random().toString(16).slice(2)

 export const randNum = () => Math.random() * 200;

 /**
 * Returns human-readable text
 *
 * @param {Number} value
 * @param {String} text
 */
 export const humanReadable = (value,text) => {
     let hr = value === 0 ? `No ${text}s` : value === 1 ? `1 ${text}` : `${value} ${text}s`
     return hr;
 }

/**
 * Toggles the element
 * @param {HTMLElement} el element to toggle
 */
 export const toggle = el => {
     let style = el.style.display;
     style === 'none' ? (style = 'block') : (style = 'none')
 }

 /**
 * Capitalizes str
 * @param {String} str
 */
 export const capitalizes_first = str => str.charAt(0).toUpperCase() + str.substr(1);

/**
 * Removes hr of last element of modal
 */
 export const removeHr = () => {
     let elements = Array.from(new d('.modal_items').toAll());
     let element = elements[elements.length -1];

    return  element ? Array.from(element.children).map(child => 
        (child.nodeName === 'hr' ? child.remove() : null)) : null
 }

/**
 * Toggle show password
 */
 export const viewPassword = ({input,icon}) => {
     let _input = new d(input);
     let _icon = new d(icon);

     if(_input.getAttr('type') === 'password'){
         _input.setAttr('type','text');
         _input.html('<i class="fas fa-unlock-alt"></i>');
         _input.css('color','#e91e63')
     }else{
         _input.setAttr('type','password');
         _icon.html('<i class="fas fa-lock"></i>');
         _icon.css('color','darkturquoise')
     }
     _input.focus()
 }

/**
 * For replacing illegal characters
 */
 export const replacer = (el,filter) => {
     let elem = new d(el);
     let regex = filter === 'normal' ? /[^a-z0-9_.@$#]/i : filter = 'bio' ? /[<>]/i : null;

     elem.on('keyup', e => {
         let value = e.currentTarget.value;
         elem.setValue(value.replace(regex,''))
     })
 }

 /**
 * Returns whether it's me
 */
 export const Me = user => (user === uData('session') ? true : false)

 /**
 * Returns whether email is verified
 */
 export const email_verified = () => {
     let ev = uData('emailVerified');
     return ev === 'yes' ? true : false
 }

/**
 * Returns whether user is private
 */
export const isPrivate = (user,isFollowing,accountType) => {
    let uprivate = !Me(user) && !isFollowing && accountType === 'private' ? true : false
    return uprivate;
}

/**
 * Compresses and returns file
 * @param {File} file
 */
 export const imageCompressor = file => {
     return new Promise(resolve => {
         new Compress(file, {
             quality: 0.6,
             success: file => resolve(file),
             error: err => console.log(err.message)
         })
     })
 }

/**
 * For profile
 */
 export const forProfile = async options => {
     let {username,dispatch,invalidUser} = options,
     {data: valid} = await post('/api/is-user-valid',{username}),
     s_username = uData('username');

     if(!valid){
         invalidUser()
     } else{
         if(username !== s_username){
             dispatch(isFollowing(username));
             dispatch(getMutualUsers(username));
             post('/api/view-profile',{username})
         }

         dispatch(getUserDetails(username));
         dispatch(getUserStats(username));
         dispatch(getUserPosts(username));
     }
 }

/**
 * For group
 */
 export const forGroup = async options => {
     let {group_id,dispatch,invalidGroup} = options,
     {data: valid} = await post('/api/is-group-valid', {group_id});

     if(!valid){
         invalidGroup();
     }else{
         dispatch(joinedGroup(group_id));
         dispatch(getGroupDetails(group_id));
         dispatch(getGroupPosts(group_id));
     }
 }

 /**
 * Scrolls down to 380
 */
 export const bottomScroll = () => (new d('html','body').toDom().scrollTop = 380)

/**
 * Notifies user [on the notification page]
 * @param {Object} options
 * @param {Number} options.to
 * @param {String} options.type
 * @param {Number} options.post_id
 * @param {Number} options.group_id
 * @param {Number} options.user
 */
 export const insta_notify = async options => {
     let defaults = {
         to:null,
         type: '',
         post_id: 0,
         group_id: 0,
         user: 0
        };
     let obj = {
         ...defaults,
         ...options
     };
     let {to,type,post_id,group_id,user} = obj;


     await post('/api/notify',{to,type,post_id,group_id,user})
 }

 /**
 * Dispatcher helper for dispatching data retrieved from URL
 *
 * @param {String} type Dispatch type
 * @param {String} url /api/URL to get data from
 * @param {Object} data data requested with the url
 */
 export const dispatchHelper = (type,url,data={}) => {
     return dispatch => post(`/api/${url}`,data)
        .then(p => dispatch({type,payload: p.data}))
        .catch(e => console.log(e))
 }

/**
 * If mssg is an array returns first element else returns it as a string.
 *
 * @param {String} mssg Message value
 * @returns { String } Individual string message
 */
 export const ObjectMssg = message => {
     return typeof message === 'object' ? (message.length > 0 ? message[0] : message) : message;
 }

/**
 * Notifies 'please wait..'
 */
 export const wait = () => notify({value: 'Please wait ...'})

/**
 * If loading, then add 'cLoading' class to the specified component which hides it until it is loaded
 * @param {Boolean} loading
 */
 export const cLoading = loading => `${loading ? 'cLoading' : ''}`

 /**
 * Request a response from an API endpoint.
 * @param {String} url Url to get response from
 * @param {Object} data Optional data to pass
 * @param {String} method Method type. Default is post
 */
 export const APIRequest = (url,data={},method='post') => {
     new Promise((resolve,reject) => {
         axios[method](url,data)
           .then(resp => resolve(resp))
           .catch(error => reject(error))
     })
 }
















































































































































































