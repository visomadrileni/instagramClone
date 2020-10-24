import {GET_USER_HASHTAGS,GET_GROUP_HASHTAGS,GET_POPULAR_HASHTAGS,GET_HASHTAG_POSTS} from '../actions/types';

const initialState = {
    userHashtags: [],
    groupHashtags: [],
    popularHashtags: [],
    hashtagPosts: []
 };

 export default(state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
         case GET_USER_HASHTAGS:
             return {
                 ...state,
                 userHashtags: pl
             }
            
         case GET_GROUP_HASHTAGS:
            return {
                ...state,
                groupHashtags: pl
            }    

         case GET_POPULAR_HASHTAGS:
             return {
                 ...state,
                 popularHashtags: pl
             }   

         case GET_HASHTAG_POSTS:
             return {
                 ...state,
                 hashtagPosts: pl
             }
             
        default:
            return state;     
     }
 }










































