import {post} from 'axios';
import {Notify} from '../utils/utilMethods/handy-notification';
import {ObjectMssg} from './utils';
import Action from './api/Action';
import d from './api/Dom';

/**
 * For username checker
 * @param {String} el
 */
 export const username_checker = el => {
     let element = new d(el);
     let uc = new d('.username_checker');

     element.on('keyup', async e => {
         let value = e.target.value;
         uc.show();
         
         if(value){
           let {data: count} = await post('/user/username-checker',{value});
           let html

           if(count === 0){
               html = `<span class="checker_text">username is available</span><span class="checker_icon"><i class="far fa-smile"></i></span>`
               uc.multipleCss({
                   width: '160px',
                   right: '-168px'
               })
           } else {
               html = `<span class="checker_text">username already token</span><span class="checker_icon"><i class="far fa=frown"></i></span>`
               uc.multipleCss({
                   width: '167px',
                   right: '-197px'
               })
            }

            uc.html(html);
         } else {
             uc.hide();
         }
     })

     element.on('blur' ,() => uc.hide());
 }

/**
 * Common function for login & signup
 *
 * @param {Object} options Options
 * @param {Object} options.data
 * @param {String} options.btn
 * @param {String} options.url
 * @param {String} options.redirect
 * @param {String} options.defBtnValue
 */
 export const commonLogin = options => {
     let {data,url,btn,redirect,defBtnValue} = options;
     let overlay2 = new d('.overlay-2');
     let button = new d(btn);
     let action = new Action(btn);

     action.start('Please wait ...');

     post(url,data).then(s => {
         let {data: {success,message}} = s;

         if(success){
             Notify({
                 value: message,
                 done: () => (window.location.href = redirect)
             })

             button.setValue('Redirecting ...');
             overlay2.show();
         } else {
             Notify({ value: ObjectMssg(message)})
             action.end(defBtnValue)
         }

        button.blur();
     }).catch(e => console.log(e))
 }









































































































