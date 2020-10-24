 import React from 'react';
 import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';
 import NotificationType from './notificationType';
 import NotificationActionType from './action-type/actionType';
 import AppLink from '../../others/link/link';
 import {number,string,bool} from 'prop-types';

 const Notification = (props) => {
     let {type,user_username,notify_by,notify_by_username,notify_time} = props;

     return (
         <div className="noti follow_noti">
             <img src={`/users/${notify_by}/avatar.jpg`} className="noti_avatar" />

             <div className="noti_left">
                 <AppLink
                   url={`profile/${notify_by_username}`}
                   className="noti_bold noti_username"
                   label={notify_by_username}
                 />
                 <NotificationType type={type} user_username={user_username} />
                 <span className="noti_time">{timeAgo(notify_time)}</span>
             </div>

             <NotificationActionType details={props} />
         </div>
     )
 }

 Notification.propTypes = {
     notify_id: number.isRequired,
     notify_by: number.isRequired,
     notify_by_username: string.isRequired,
     notify_time: string.isRequired,
     type: string.isRequired,
     user: number.isRequired,
     user_username: string.isRequired,
     post_id: number.isRequired,
     group_id: number.isRequired,
     isFollowing: bool.isRequired
 }

 export default Notification;