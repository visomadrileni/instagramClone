 import React from 'react';
 import AppLink from '../../../others/link/link';
 import {number} from 'prop-types';

 const NotificationTypePost = ({post_id}) => (
     <AppLink
        url={`/post/${post_id}`}
        className="pri_btn"
        label="Open post"
     />
 )

 NotificationTypePost.propTypes = {
     post_id: number.isRequired
 }

 export default NotificationTypePost;