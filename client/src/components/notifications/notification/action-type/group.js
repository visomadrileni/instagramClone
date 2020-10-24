 import React from 'react';
 import AppLink from '../../../others/link/link';
 import {number} from 'prop-types';

 const NotificationTypeGroup = ({group_id}) => (
     <AppLink
         url={`/group/${group_id}`}
         className="pri_btn"
         label="View group"
     />
 )

 NotificationTypeGroup.propTypes = {
     group_id: number.isRequired
 }

 export default NotificationTypeGroup;