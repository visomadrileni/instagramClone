 import axios from 'axios';
 import d from '../utils/api/Dom';
 import * as fn from '../utils/utils';
 import * as User from '../utils/user-system-utils';
 import {quickLogin} from '../utils/quick-login-utils';
 import {Notify} from '../utils/utilMethods/handy-notification';

 new d('.nh_logo').on('click', () => (window.location.href = '/welcome'));
 new d('.h_logo').on('click' , () => (window.location.href = '/'));

 //View password for sign up
 new d('.s_p_s').on('click', () => {
     fn.viewPassword({
         input: '#s_password',
         icon: '.s_p_s'
     })
 });

 //View password for login
 new d('.s_p_l').on('click', () => {
     fn.viewPassword({
         input: '#l_password',
         icon: '.s_p_l'
     })
 });

 //Flitering illegal characters
 fn.replacer('.s_username', 'normal');
 fn.replacer('.s_firstname', 'normal');
 fn.replacer('.s_surname','normal');

 //Username checker
 User.username_checker('.s_username');

 //User Signup
 new d('form.form_register').on('click', event => {
    event.preventDefault();

    let username = new d('.s_username').val();
    let firstname = new d('s_firstname').val();
    let surname = new d('s_surname').val();
    let email = new d('.s_email').val();
    let password = new d('.s_password').val();

    if(!username || !firstname || !surname || !email || !password){
        Notify({ value: 'Value are missing'})
    } else {
        let signupOptions = {
            data: {
                username,
                firstname,
                surname,
                email,
                password
               },
            when: 'signup',
            btn: '.s_submit',
            url: '/user/signup',
            redirect: '/registered',
            defBtnValue: 'Signup for free'   
        };

        User.commonLogin(signupOptions);
    }
 })

 //User login
 new d('form.form_login').on('click', event => {
     event.preventDefault();

     let username = new d('.l_username').val();
     let password = new d('.l_password').val();

     if(!username || !password){
         Notify({ value: 'Values are missing'})
     } else {
         let loginOptions = { 
             data: {
                 username,
                 password
                },
             when: 'login',
             btn: '.l_submit',
             url: '/user/login',
             redirect: '/',
             defBtnValue: 'Login to Continue'   
         };

         User.commonLogin(loginOptions);
     }
 }); 

  //event.currentTarget.dataset => property on the HTML Or ForeignElement interface provides read/write access to
  //all the custom data attributes (data-*) set on the element.This access is available both in HTML and within the DOM. 

 //Quick login
 let allQuickLogin = Array.from(new d('.q_l_div').toAll());
 for(let elem of allQuickLogin){
       elem.addEventListener('click', event => {
         let {id,username} = event.currentTarget.dataset
         quickLogin({id,username});
     })
 }

 //Close quick modal
 new d('.q_l_m_cancel').on('click',() => {
     new d('.overlay-2-black').hide();
     new d('#q_l_password').setValue('');
     new d('.q_l_model').hide();
 })

 //Clear all quick login
 new d('.clear_all_ql').on('click', async event => {
     event.preventDefault();

     await axios.post('/api/clear-all-quick-logins');
     Notify({
         value: 'Cleared all quick logins',
         done: () => window.location.reload()
     })
 })

 //Forgot password
 new d('form.form_fp').on('submit',async event => {
   event.preventDefault();

   let email = new d('.fp_email').val();
   if(!email){
       Notify({ value: 'Email field is empty'})
   } else {
       let forgotPasswordOptions = {
           data: {email},
           when: 'forgot_password',
           btn: '.fp_submit',
           url: '/url/password-retrieve',
           redirect: '/',
           defBtnValue: 'Retrive'
       };
      
     User.commonLogin(forgotPasswordOptions);  
   }
 })






























































