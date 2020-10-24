import {post} from 'axios';
import {comment} from '../actions/post';
import {notify} from '../utils/utilMethods/handy-notification';
import {imageCompressor,insta_notify,Me,uData,wait} from './utils';
import d from './api/Dom'

/**
 * A helper for dispatching actions related to comments
 * @param {Object} options
 */
 const commentDispatchHelper = async options => {
     let {user,post_id,comment_id,commentExtraDetails,when,dispatch} = options;
     let session = uData('session');
     let username = uData('username');

     if(when === 'viewPost'){
         dispatch(comment({
               comment_id,
               comment_by: Number(session),
               comment_by_username: username,
               post_id,
               comment_ime: `${new Date().getTime()}`,
               ...commentExtraDetails
             }))
     }

     if(!Me(user)){
         insta_notify({
             to: user,
             type: 'comment',
             post_id
         })
     }
 }

/**
 * Image comment
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {Function} options.dispatch
 * @param {String} options.when
 * @param {Number} options.user
 * @param {File} options.file
 * @param {Function} options.done
 */
 export const imageComment = async options => {
     let {post_id,dispatch,when,user,file:commentFile,done} = options;
     let form = new FormData();
     let file = await imageCompressor(commentFile);
     let d = new d('.overlay-2');

     d.show();
     wait();

     form.append('commentImage',file);
     form.append('post',post_id);

     let { data:{success,message,filename,comment_id}} = await post('/api/comment-image',form);
     if(success){
         await commentDispatchHelper({
             user,
             post_id,
             comment_id,
             when,
             dispatch,
             commentExtraDetails: {
                 type: 'image',
                 commentSrc: filename,
                 text: ''
             }
         })

         done();
     }

     d.hide();
     notify({
         value: message
     })
 }

/**
 * Sticker comment
 * @param {Object} options
 * @param {String} options.sticker
 * @param {Number} options.post_id
 * @param {Number} options.user
 * @param {String} options.when
 * @param {Function} options.dispatch
 */
  export const stickerComment = async options => {
      let {sticker,post_id,user,when,dispatch,done} = options;
      let {data: {message,success,comment_id,filename}} = await post('/api/comment-sticker', {sticker,post: post_id});
      
      wait();
      if(success){
          await commentDispatchHelper({
            user,
            post_id,
            comment_id,
            when,
            dispatch,
            commentExtraDetails: {
                type: 'sticker',
                commentSrc: filename,
                text: ''
            }
          })
          done();
      }

      notify({
          value: message
      })
  }

/**
 * Text comment
 * @param {Object} options
 * @param {Number} options.post
 * @param {String} options.text
 * @param {String} options.when
 * @param {Function} options.dispatch
 * @param {Number} options.postOwner
 */
 export const textComment = async options => {
     let {post: post_id,text,when,dispatch,postOwner,done} = options;
     let {data: {success,message,comment_id}} = await post('/api/comment-text', {post_id,text});

     if(success){
         await commentDispatchHelper({
             user: postOwner,
             post_id,
             comment_id,
             when,
             dispatch,
             commentExtraDetails: {
                 type: 'text',
                 commentSrc: '',
                 text
             }
         })

         done();
     }

     notify({
         value: message
     });
 }
















































































































