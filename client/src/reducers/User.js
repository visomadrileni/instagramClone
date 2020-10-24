 import {uData} from '../../src/utils/utils';
 import {uniqBy} from 'lodash';
 import {ADD_TAG,DELETE_TAG,GET_USERS_DETAILS,GET_MUTUAL_USERS} from '../actions/types';

 const initialState = {
     session: {
         id: Number(uData('session')),
         username: uData('username')
        },
     user_details: {
         id: null,
         username: '',
         firstname: '',
         surname: '',
         email: '',
         bio: '',
         account_type: '',
         email_verified: '',
         joined: '',
         twitter: '',
         facebook: '',
         github: '',
         instagram: '',
         phone: '',
         website: '',
         isOnline: false,
         lastOnline: ''
     },
     tags: [],
     mutualUsers: []
 };

  const addTag = (tags,t) => {
      tags.unshift(t);
      return uniqBy(tags,'tag')
  }

 const deleteTag = (tags,value) => tags.filter(t => t.tag !== value);

 const User = (state=initialState,action) => {
    switch(action.type){
          case GET_USERS_DETAILS:
              return {
                  ...state,
                  user_details: action.payload.details,
                  tags: action.payload.tags
              }

           case ADD_TAG:
               return {
                   ...state,
                   tags: addTag(state.tags,action.payload)
               }   

           case DELETE_TAG:
               return {
                   ...state,
                   tags: deleteTag(state.tags,action.payload)
               } 
               
            case GET_MUTUAL_USERS:
                return {
                    ...state,
                    mutualUsers: action.payload
                }   

          default: 
              return state;      
      }
  }

export default User;















































































































