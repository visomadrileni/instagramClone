 import React from 'react';
 import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';
 import {string} from 'prop-types';

 const LastMessageTime = ({lastMssgTime}) => {
       return (
             <span className="m_sr_time">{lastMssgTime && timeAgo(lastMssgTime).replace('ago', '')}</span>
             )
 }

 LastMessageTime.propTypes = {
     lastMssgTime: string
 }

 export default LastMessageTime;