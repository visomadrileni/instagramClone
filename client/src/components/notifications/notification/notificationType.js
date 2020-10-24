 import React from 'react';
 import {string} from 'prop-types';

 const NotificationType = ({ type,user_username}) => {
     return (
         <span>
            {           
              type === 'follow' ? 'started following you'
            : type === 'tag' ? 'tagged you in a post'
            : type === 'like' ? 'liked your post'
            : type === 'share' ? 'shared you a post'
            : type === 'shared_your_post' ? 'shared your post'
            : type === 'comment' ? 'commented on your post'
            : type === 'favourites' ? 'added you to favourites'
            : type === 'recommend' ? `recommend ${user_username} to you`
            : type === 'add_grp_member' ? 'added you to group'
            : type === 'invite' ? 'invited to a group'
            : type === 'change_admin' ? 'made you admin of a group'
            : type === 'new_con' ? 'created a conversation with you'
            : type === 'mention_post' ? 'mentioned you in a post'
            : type === 'mention_comment' ? 'mentioned you in a comment'
            : null            
            }
         </span>
     )
 }

 NotificationType.propTypes = {
     type: string.isRequired,
     user_username: string.isRequired
 }

 export default NotificationType;