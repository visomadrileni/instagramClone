 import React,{Fragment} from 'react';
 import {connect} from 'react-redux'
 import {post} from 'axios';
 import {unbookmark} from '../../../../../actions/post';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import {notify} from '../../../../../utils/utilMethods/handy-notification'
 import {number,string} from 'prop-types';

 const RemBookmarkAsAdmin = ({post_id,user,when,dispatch}) => {
     let remBookmarkAsAdmin = async e => {
         e.preventDefault();
         await post('/api/unbookmark-post',{post:{post_id}, user})
         dispatch(unbookmark(post_id))
         notify({ value: 'Post unbokkmarked as admin'})
     }

     return (
         <Fragment>
             {when === 'bookmarks' && isAdmin() && (
                 <li>
                     <a href="#" onClick={remBookmarkAsAdmin}>Remove bookmark as admin</a>
                 </li>
             )}
         </Fragment>
     )
 }

 RemBookmarkAsAdmin.propTypes = {
     post_id: number.isRequired,
     user: number.isRequired,
     when: string.isRequired
 }

 export default connect()(RemBookmarkAsAdmin);