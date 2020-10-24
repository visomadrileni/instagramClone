 import React from 'react';
 import AppLink from '../../../others/link/link';
 import {string} from 'prop-types';

 const NotificationTypeProfile = ({user_username}) => (
     <AppLink
       url={`/profile/${user_username}`}
       className="pri_btn"
       label={`View ${user_username}`}
     />
 )

 NotificationTypeProfile.propTypes = {
     user_username: string.isRequired
 }

 export default NotificationTypeProfile;