import {post} from 'axios';
import {notify} from '../utils/utilMethods/handy-notification';
import * as followA from '../actions/follow';
import {insta_notify,uData} from './utils';

/**
 * Follow user
 *
 * user, username & done properties must be provided.
 *
 * Provide update_followers when user's followers data need to be updated.
 * Eg. On Banner Comp.
 *
 * Provide update_followings when user's followings data need to be updated.
 * Eg. On Followers Comp.
 *
 * Provide dispatch when either update_followers OR update_followings needs to be updated
 *
 * Provide Firstname & Surname when update_followings=true
 *
 * Provide username as it used for notifying.
 *
 * @param {Object} options Options for following user
 * @param {Number} options.user
 * @param {String} options.username
 * @param {firstname} options.firstname
 * @param {surname} options.surname
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
 export const follow = async options => {
     let defaults = {
          user: null,
          username: null,
          firstname: null,
          surname: null,
          update_followers: false,
          update_followings: false,
          dispatch: () => null,
          done: () => null
         };
      let obj = {...defaults,...options};
      let {user,username,firstname,surname,update_followers,update_followings,dispatch,done} = obj;
      let {data: {success,message,ff}} = await post('/api/follow',{user,username});

      if(success){
          let following = {
              follow_id: ff.follow_id,
              follow_to: user,
              follow_by: Number(uData('session')),
              username,
              firstname,
              surname,
              isFollowing: true,
              follow_time: ff.follow_time
            };

         if(update_followers){ 
             dispatch(followA.Follower(ff))
         }
         if(update_followings){
            dispatch(followA.Following(following))
         }

         insta_notify({
             to: user,
             type: 'follow'
          });
        done();
      }

   notify({ value: message})   
 }

/**
 * Unfollow user
 *
 * user & done properties must be provided.
 *
 * Provide update_followers when user's followers data need to be updated.
 * Eg. On Banner Comp.
 *
 * Provide update_followings when user's followings data need to be updated.
 * Eg. On Followers Comp.
 *
 * Provide dispatch when either update_followers OR update_followings needs to be updated
 *
 * @param {Object} options Options for unfollowing user
 * @param {Number} options.user
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
  export const unfollow = async options => {
      let defaults = {
          user: null,
          update_followers: false,
          update_followings: false,
          dispatch: () => null,
          done: () => null
         };
       let obj = {...defaults,...options};
       let {user,update_followers,update_followings,dispatch,done} = obj;
       let session = uData('session');
       let {data: {success,message}} = await post('/api/unfollow',{user});

       if(success){
           if(update_followers){
               dispatch(followA.Unfollower(session))
           }   
          
           if(update_followings){
              dispatch(followA.Unfollowing(user));
           }  
           done();
       }

       notify({ value: message})
  }

/**
 * Add user to favorites
 * @param {Number} user User to add to favorites
 */
 export const addToFavourites = async user => {
   let {data: {success,message}} = await post('/api/add-to-favourites',{user});
   if(success){
       insta_notify({
           to: user,
           type: 'Favourites'
       })
   }

   notify({value: message })
 }

/**
 * Recommends a user
 * @param {Object} options
 * @param {Number} options.recommend_to
 * @param {Number} options.user
 */
 export const recommendUser = async options => {
     let {user,recommend_to} = options;
     let {data: {success,message}} = await post('/api/recommend-user', {user,recommend_to});

     if(success){
         insta_notify({
             to: recommend_to,
             type: 'recommend',
             user
         })
     }

   notify({value: message})  
 }






































































































































































