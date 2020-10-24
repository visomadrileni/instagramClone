 import React,{Fragment} from 'react';
 import {number} from 'prop-types';

 const UnreadMessages = ({unreadMessages}) => {
     return (
        <Fragment>
            {unreadMessages != 0 && (
            <span className="m_sr_unread">{unreadMessages > 9 ? '+' : unreadMessages}</span>
            )}
       </Fragment>
     )
 }

 UnreadMessages.propTypes = {
     unreadMessages: number.isRequired
 }

 export default UnreadMessages;