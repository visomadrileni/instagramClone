 import React from 'react';
 import classNames from 'classnames';
 import LastMessage from './last-message';
 import UnreadMessages from './unread-messages';
 import MyLastMessage from './myLastMessages';
 import LastMessageTime from './last-message-time';
 import {number,string,shape,oneOf,oneOfType, func} from 'prop-types';

 const ConversationTeaser = props => {
     let {
         con_id,
         con_with,
         con_with_username,
         unreadMssgs,
         select,
         lastMssg: {lastMessageTime,lastMessage,lastMessageBy,lastMessageType} 
        } = props;

     return (
         <div className={classNames('mssg_sr',`mt_${con_id}`)} onClick={select}>
             <img src={`/users/${con_with}/avatar.jpg`} alt="avatar" />

             <div className="m_sr_content">
                 <span className="m_sr_username">{con_with_username}</span>
                 <span className="m_sr_light">
                     <MyLastMessage lastMessageBy={lastMessageBy} />
                     <LastMessage lastMessage={lastMessage} lastMessageType={lastMessageType} />
                 </span>
             </div>

             <LastMessageTime lastMssgTime={lastMessageTime} />
             <UnreadMessages unreadMessages={unreadMssgs} />
         </div>
     )   
 }

 ConversationTeaser.propTypes = {
     con_id: number.isRequired,
     con_with: number.isRequired,
     con_with_username: string.isRequired,
     unreadMessages: number.isRequired,
     lastMssg: shape({
         lastMessage: string,
         lastMessageBy: oneOfType([number,string]),
         lastMessageTime: string,
         lastMessageType: oneOf(['text','image','sticker',''])
     }),
     select: func.isRequired
 } 

 export default ConversationTeaser;