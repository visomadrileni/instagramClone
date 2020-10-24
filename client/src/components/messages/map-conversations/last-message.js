import React,{Fragment} from 'react';
import {shortener} from '../../../utils/utils';
import FAIcon from '../../others/icons/font-awesome-icon';
import {string,oneOf} from 'prop-types';

 const LastMessage = ({lastMessage,lastMessageType}) => {
     return (
        <Fragment>
        {lastMessage ? (
            lastMessageType === 'text' ? (
                shortener(lastMessage,15)
            ) : lastMessageType === 'image' ? (
                <span className="camera">
                    <FAIcon icon="camera" />
                </span>
            ) : lastMessageType === 'sticker' ? (
                <span className="camera">
                    <FAIcon icon="gift" />
                </span>
            ) : null
        ) : null }
    </Fragment>
     )
 }

 LastMessage.propTypes = {
     lastMessage: string,
     lastMessageType: oneOf(['text','image','sticker',''])
 } 


 export default LastMessage;