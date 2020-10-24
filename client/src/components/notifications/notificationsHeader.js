 import React from 'react';
 import {connect} from 'react-redux';
 import ToolTip from 'react-tooltip';
 import {notify} from '../../utils/utilMethods/handy-notification';
 import {clearNotifications} from '../../actions/notification';
 import MaterialIcon from '../others/icons/material-icon';

 const NotificationHeader = ({len,dispatch}) => {
     let clear = () => {
         dispatch(clearNotifications())
         notify({ value: 'Notifications cleared'})
     }

     return (
         <div className="notifications_header">
             <span className="nooti_count">{len === 0 ? 'No' : len}</span>
             {len !== 0 && (
                 <div>
                     <span onClick={clear} className="clear_noti" data-tip="Clear notifications">
                         <MaterialIcon icon="clear_all" />
                     </span>
                     <ToolTip />
                 </div>
             )}
         </div>
     )
 } 

 const mapStateToProps = state => ({
     len: state.Notification.notifications.length
 })

 export default connect(mapStateToProps)(NotificationHeader)