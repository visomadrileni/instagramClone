 import React,{Fragment} from 'react';
 import ToolTip from 'react-tooltip';
 import {FadeIn} from 'animate-components';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import EditMessageTool from './edit-message-tool';
 import DeleteMessageTool from './delete-message-tool';
 import {number,string,func,shape} from 'prop-types';

 const MessageTools = ({messageDetails,updateMessage}) => {
     let {message_by} = messageDetails;

     return (
         <Fragment>
             {(Me(message_by) || isAdmin()) && (
                 <FadeIn duration="300ms">
                     <DeleteMessageTool messageDetails={messageDetails} />
                     <EditMessageTool messageDetails={messageDetails} updateMessage={updateMessage} />

                     <ToolTip />
                 </FadeIn>
             )}
         </Fragment>
     )
 }

 MessageTools.propTypes = {
     messageDetails: shape({
         message_id: number.isRequired,
         message: string.isRequired,
         type: string.isRequired,
         message_by: number.isRequired
        }).isRequired,
     updateMessage: func.isRequired   
 }

 export default MessageTools;