import {GET_USER_POSTS,GET_BOOKMARKED_POSTS,GET_TAGGED_POSTS,GET_SHARED_POSTS,GET_PHOTOS,GET_GROUP_POSTS,
    GET_GROUP_PHOTOS,GET_FEED,GET_POST,GET_POST_TAGS,GET_POST_LIKES,REMOVE_LIKE,GET_USERS_TO_SHARE,GET_POST_SHARERS,ADD_USER_POST,
    ADD_GROUP_POST,EDIT_POST,DELETE_POST,UNTAG,REMOVE_SHARE,DELETE_COMMENT,EDIT_COMMENT,UNBOOKMARK,COMMENT,
    RESET_POSTIT,CHANGE_POSTIT_PROPERTIES} from '../actions/types';

const PostInitialState = {
     fileInput: '',
     fileChanged: false,
     targetFile: '',
     previewImg: '/img/location.jpg',
     desc: '',
     filter: 'filter-normal',
     fetchingLocation: false,
     location: '',
     addTag: false,
     tags: [],
     showOverlay: false,
     type: '',
     group: null
 };

 const initialState = {
     posts: [],
     bookmarks: [],
     tagged: [],
     shared: [],
     photos: [],
     feed: [],
     viewPost: [],
     likes: [],
     tags: [],
     posted: false,
     isPostMine: false,
     usersToShare: [],
     sharers: [],
     postIt: PostInitialState 
 };

 const deletePost = (posts,post) => posts.filter(p => p.post_id !== parseInt(post));
 const unbookmark = (bookmarks,post) => bookmarks.filter(b => b.post_id !== post);
 const removeShare = (sharers,share_id) => sharers.filter(s => s.share_id !== share_id);
 const removeLike = (likes,like_id) => likes.filter(l => l.like_id !== like_id);

 const addPost = (posts,post) => {
     posts = [...posts,post];
     return posts;
 }

 const editPost = (posts,{post_id,description}) => {
     return posts.map(p => {
         if(p.post_id === post_id){
             p.description = description
         }
         return p
     })
 }

 const untag = (tags,user) => {
     let tagedUsers = tags.filter(t => t.user !== user);
     return tagedUsers;
 }

 const comment = (post,comment) => {
     post = {
         ...post,
         comments: [...post.comments,comment]
       };
     return post;  
 }

 const editComment = (post,{comment_id,comment}) => {
     let comments = post.comments.map(c => {
         if(c.comment_id === comment_id){
             c.comment = comment
         }
         return c;
     });

     return {
         ...post,
         comments
     }
 }

 const deleteComment = (post,comment_id) => {
     let comments = post.comments.filter(c => c.comment_id != comment_id)
     return {
         ...post,
         comments
     }
 }

 const changePostIt = (postIt,plOptions) => {
     let {what,value} = plOptions;
     let updated = {
               ...postIt,
               [what]: value
            }
    return updated;
 }

 const resetPostItProperties = () => {
     let reset = PostInitialState;
     return reset;
 }

 export default (state=initialState,action) => {
     let pl = action.payload;
     switch(action.type){
            case GET_USER_POSTS:
             return {
                 ...state,
                 posts: pl
             }

            case GET_BOOKMARKED_POSTS:
             return {
                 ...state,
                 bookmarks: pl
             }    

            case GET_TAGGED_POSTS:
              return {
                  ...state,
                  tagged: pl
              }   

            case GET_SHARED_POSTS:
              return {
                  ...state,
                  shared: pl
              }  
              
            case GET_PHOTOS:
              return {
                  ...state,
                  photos: pl
              }    

            case GET_FEED:
              return {
                  ...state,
                  feed: pl
              }    

            case GET_GROUP_POSTS:
              return {
                  ...state,
                  posts: pl
              }    

            case GET_GROUP_PHOTOS:
              return {
                  ...state,
                  photos: pl
              }  
              
            case GET_POST:
               return {
                   ...state,
                   viewPost: pl
               }   

            case ADD_USER_POST:
               return {
                   ...state,
                   feed: addPost(state.feed,pl)
               }  
               
            case ADD_GROUP_POST:
               return {
                   ...state,
                   posts: addPost(state.posts,pl)
               }    

            case EDIT_POST:
               return {
                   ...state,
                   posts: editPost(state.posts,pl)
               }   
               
            case DELETE_POST:
                return {
                    ...state,
                    posts: deletePost(state.posts,pl),
                    feed: deletePost(state.feed,pl)
                }  
                
            case GET_POST_LIKES:
                return {
                    ...state,
                    likes: pl.likes,
                    isPostMine: pl.isPostMine
                } 
                
             case REMOVE_LIKE:
                 return {
                     ...state,
                     likes: removeLike(state.likes,pl)
                 }   

             case GET_POST_TAGS:
                 return {
                     ...state,
                     tags: pl.tags,
                     isPostMine: pl.isPostMine
                 }   
                 
             case UNTAG:
                return {
                   ...state,
                   tags: untag(state.tags,pl)
                 }  
                 
             case GET_USERS_TO_SHARE:
                 return {
                     ...state,
                     usersToShare: pl
                 }  
                 
             case GET_POST_SHARERS:
                 return {
                     ...state,
                     sharers: pl
                 } 
                 
             case UNBOOKMARK:
                 return {
                     ...state,
                     bookmarks: unbookmark(state.bookmarks,pl)
                 } 
                 
             case REMOVE_SHARE:
                 return {
                     ...state,
                     sharers: removeShare(state.sharers,pl)
                 }    

              case COMMENT:
                  return {
                      ...state,
                      viewPost: comment(state.viewPost,pl)
                  } 
                  
              case DELETE_COMMENT:
                  return {
                      ...state,
                      viewPost: deleteComment(state.viewPost,pl)
                  }    

              case EDIT_COMMENT:
                  return {
                      ...state,
                      viewPost: editComment(state.viewPost,pl)
                  }    

               case CHANGE_POSTIT_PROPERTIES:
                   return {
                       ...state,
                       postIt: changePostIt(state.postIt,pl)
                   } 
                   
               case RESET_POSTIT:
                   return {
                       ...state,
                       postIt: resetPostItProperties()
                   } 
                   
           default: 
                return state;        
     }
 }








































































