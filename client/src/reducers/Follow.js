import {FOLLOW_TOGGLE,FOLLOWER,UNFOLLOWER,GET_FOLLOWERS,GET_FOLLOWINGS,IS_FOLLOWING,FOLLOWING,UNFOLLOWING
    ,REMOVE_FAVOURITES,GET_USER_STATS,GET_USERS_TO_RECOMMEND,REMOVE_RECOMMADATION} from '../actions/types';

const initialState = {
    isFollowing: false,
    followers: [],
    followings: [],
    profile_views: 0,
    favourites: [],
    usersToRecommend: [],
    recommendations: []
 };

 const follower = (followers,n) => {
     followers.unshift(n);
     return followers;
 }

 const following = (followings,n) => {
     followings.unshift(n);
     return followings;
 } 

 const unfollower = (followers,n) => followers.filter(f => f.filter_by !== parseInt(n));
 const unfollowing = (followings,n) => followings.filter(ff => ff.follow_to !== parseInt(n));
 const remFav = (favs,fav_id) => favs.filter(f => f.fav_id !== fav_id);
 const remRec = (recommends,recommend_id) => recommends.filter(r => r.recommend_id !== parseInt(recommend_id));

 export default (state=initialState,action) => {
     let pl = action.payload;

     switch(action.type){
         case IS_FOLLOWING:
            return {
                  ...state,
                  isFollowing: pl
            }

          case FOLLOW_TOGGLE:
             return {
                  ...state,
                  isFollowing: pl
             }  

          case GET_USER_STATS:
             return {
                 ...state,
                 followers: pl.followers,
                 followings: pl.followings,
                 profile_views: pl.views_count,
                 favourites: pl.favourites,
                 recommendations: pl.recommendations
             } 
             
           case GET_FOLLOWERS:
               return {
                   ...state,
                   followers: pl
               } 

           case GET_FOLLOWINGS:
              return {
                  ...state,
                  followings: pl
              }  
              
            case FOLLOWER:
               return {
                   ...state,
                   followers: follower(state.followers,pl)
               }

            case UNFOLLOWER:
               return {
                   ...state,
                   followers: unfollower(state.followers,pl)
               }   

             case FOLLOWING:
                return {
                    ...state,
                    followings: following(state.followings,pl)
                } 
                
             case UNFOLLOWING:
                return {
                    ...state,
                    followings: unfollowing(state.followings,pl)
                }    

             case REMOVE_FAVOURITES:
                 return {
                     ...state,
                     favourites: remFav(state.favourites,pl)
                 }  

             case GET_USERS_TO_RECOMMEND:
                return {
                    ...state,
                    usersToRecommend: pl
                }
                
             case REMOVE_RECOMMADATION:
                 return {
                     ...state,
                     recommendations: remRec(state.recommendations,pl)
                 } 
                 
         default: 
             return state;        
     }
 }
