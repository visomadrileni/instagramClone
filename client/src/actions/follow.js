 import {FOLLOW_TOGGLE,FOLLOWER,UNFOLLOWER,GET_FOLLOWERS,GET_FOLLOWINGS,IS_FOLLOWING,FOLLOWING,UNFOLLOWING
    ,REMOVE_FAVOURITES,GET_USER_STATS,GET_USERS_TO_RECOMMEND,REMOVE_RECOMMADATION} from './types' 
 import {dispatchHelper} from '../utils/utils';

 export const isFollowing = username => dispatchHelper(IS_FOLLOWING,'is-following',{username});
 export const getUserStats = username => dispatchHelper(GET_USER_STATS,'get-user-stats',{username});
 export const getFollowers = user => dispatchHelper(GET_FOLLOWERS,'get-followers',{user});
 export const getFollowings = user => dispatchHelper(GET_FOLLOWINGS,'get-followings',{user});
 export const getUsersToRecommend = user => dispatchHelper(GET_USERS_TO_RECOMMEND,'get-users-to-recommend',{user});

 export const toggleFollow = f => {
     return {
         type: FOLLOW_TOGGLE,
         payload: f
     }
 }

 export const Follower = follower => {
     return {
         type: FOLLOWER,
         payload: follower
     }
 }

 export const Unfollower = unfollower => {
     return {
         type: UNFOLLOWER,
         payload: unfollower
     }
 }

 export const Following = following => {
     return {
         type: FOLLOWING,
         payload: following
     }
 }

 export const Unfollowing = unfollowing => {
     return {
         type: UNFOLLOWING,
         payload: unfollowing
     }
 }

 export const removeFavourites = fav_id => {
     return {
         type: REMOVE_FAVOURITES,
         payload: fav_id
     }
 }

 export const removeRecommandation = recommend_id => {
     return {
         type: REMOVE_RECOMMADATION,
         payload: recommend_id
     }
 }






























































