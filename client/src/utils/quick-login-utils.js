import {post} from 'axios';
import {Notify} from '../utils/utilMethods/handy-notification';
import {viewPassword} from './utils';
import d from './api/Dom';
import {commonLogin} from './user-system-utils'

/**
 * Quick login
 * @param {Object} options
 * @param {Number} options.id
 * @param {String} options.username
 */
 export const quickLogin = async options => {
   let {id,username} = options;
   let usernameDiv = new d('.q_l_username');
   let imgDiv = new d('.q_l_m_img');
   let password = new d('#q_l_password');
   let icon = new d('');
   new d('.overlay-2-black').show();
   new d('.q_l_model').show();

   password.focus().setAttr('type','password');
   icon.html('<i class="fas fa-lock"></i>');
   icon.css('color','darkturquoise');

   usernameDiv.text(`@${username}`);
   imgDiv.setAttr('src',`/users/${id}/avatar.jpg`);

   //Quick login submit
   new d('.q_l_m_form').on('submit', e => {
     e.preventDefault();
     quickLoginSubmit(username);
   });

   //Clear quick login 
   new d('.q_l_remove').on('click', async e => {
     e.preventDefault();
     await post('/api/remove-quick-login' , {id});
     Notify({
       value: `Removed ${username} from quick login`,
       done: () => window.location.reload()
     })
   });

   //Toggle view password
  new d('.s_p_ql').on('click', () => {
     viewPassword({
       input: '#q_l_password',
       icon: '.s_p_ql'
     })
  });
 }

 
/**
 * Quick login submit
 * @param {String} username Username for submitting
 */
 const quickLoginSubmit = username => {
    let password = new d('#q_l_password').val();
    if(!password){
      Notify({ value: 'Password value is missing'})
    } else {
      let loginOpt = {
        data : {
          username,
          password
          },
        when: 'login',
        btn: '.q_l_submit',
        url: '/user/login',
        redirect: '/',
        defBtnValue: 'Login to Continue'
      };

       commonLogin(loginOpt);
    }
 }










































































