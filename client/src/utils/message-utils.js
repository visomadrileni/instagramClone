import {post} from 'axios';
import {notify} from '../utils/utilMethods/handy-notification';
import {conversationAdded,messaged,changeLastMssg,unsendAllMessages,deleteCon,deleteMssg} from '../actions/message';
import {insta_notify,imageCompressor,uData,wait} from './utils';
import d from './api/Dom';
import Action from './api/Action';

/**
 * Scrolls down to bottom of the conversation
 */
 export const messageScroll = () => {
     new d('.mssg_end').scrollTop()
 }

/**
 * Creates a new conversation
 * @param {Object} options
 * @param {Number} options.user
 * @param {String} options.username
 * @param {Function} options.dispatch
 * @param {Boolean} options.updateConversations
 * @param {Function} options.done
 */
 export const newConversation = async options => {
     let {user,username,updateConversations,dispatch,done} = options;
     let {data: {success,message,con_id}} = await post('/api/create-new-conversation',{user});
     wait();

     if(success){
         done();
         if(updateConversations){
             dispatch(conversationAdded({
                 key: con_id,
                 con_id,
                 con_with: user,
                 con_with_username: username,
                 lastMssg: {
                     lastMessage: '',
                     lastMessageBy: null,
                     lastMessageTime: null,
                     lastMessageType: ''
                 },
                 unreadMssgs: 0
             }))
         }

         insta_notify({
             to: user,
             type: 'new_con'
         })
     }

     notify({ value: message})
 }

/**
 * A helper for dispatching actions related to messages
 * @param {Object} options
 */
 const messageDispatchHelper = async options => {
     let {con_id,con_with,message_id,message,messageType,dispatch} = options;
     let session = uData('session');

     dispatch(messaged({
         con_id,
         message,
         message_id,
         message_time: `${new Date().getTime()}`,
         message_by: Number(session),
         message_to: con_with,
         type: messageType,
         status: 'read'
     }));

     dispatch(changeLastMssg({
         con_id,
         lastMssg: {
             lastMessage: message,
             lastMessageBy: session,
             lastMessageTime: `${new Date().getTime()}`,
             lastMessageType: messageType
         }
     }));
 }

/**
 * Test message
 * @param {Object} options
 * @param {String} options.message
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
 export const textMessage = async options => {
     let {message,con_id,con_with,dispatch} = options;
     let action = new Action('.mssg_send');

     action.start();
     if(!message){
         notify({value: 'Comment field is empty'})
     } else {
         let {data: {success,message,message_id}} = await post('/api/text-message',{message,con_id,con_with});
         if(success){
             messageDispatchHelper({
                 con_id,
                 con_with,
                 message_id,
                 message,
                 messageType: 'text',
                 dispatch
             })
         } else{
             notify({ value: message})
         } 
     }

     messageScroll();
     action.end('Send');
 }

 /**
 * Image message
 * @param {Object} options
 * @param {File}   options.file
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
 export const imageMessage = async options => {
     let {file: messageFile,con_id,con_with,dispatch} = options;
     let form = new FormData();
     let file = await imageCompressor(messageFile);
     let d = new d('.overlay-2');

     d.show();
     wait();

     form.append('messageFile',file);
     form.append('con_id',con_id);
     form.append('con_with', con_with);

     let {data:{success,message,message_id,filename}} = await post('/api/image-message',form);
     if(success){
         messageDispatchHelper({
             con_id,
             con_with,
             message_id,
             message: filename,
             messageType: 'image',
             dispatch
         })
     }

     messageScroll();
     d.hide();
     notify({ value: message});
 }

/**
 * Sticker message
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {String} options.sticker
 * @param {Function} options.dispatch
 */
 export const stickerMessage = async options => {
     let {con_id,con_with,sticker,dispatch} = options;
     let {data: {success,message,filename,message_id}} = await post('/api/sticker-message', {con_id,con_with,sticker});

     wait();
     if(success){
         messageDispatchHelper({
             con_id,
             con_with,
             message_id,
             message: filename,
             messageType: 'sticker',
             dispatch
         })
     }

    notify({ value: message});
    messageScroll(); 
 }

/** Unsend all messages
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 */
 export const deleteYourMessages = async options => {
     let {con_id,dispatch} = options;
     let session = uData('session');

     wait();
     let {data: {success,message}} = await post('/api/unsend-all-mssgs',{con_id});
     notify({ value: message})
     return success ? dispatch(unsendAllMessages(session)) : null;
 }

/**
 * Deletes a conversation
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 * @param {Function} options.hideConversation
 */
 export const deleteConversation = async options => {
     let {con_id,hideConversation,dispatch} = options;
     let {data: {success,message}} = await post('/api/delete-conversation',{con_id});

     wait();
     if(success){
         dispatch(deleteCon(con_id));
         hideConversation();
     }

     notify({value: message})
 }

/**
 *
 * @param {Object} options
 * @param {Number} options.message_id
 * @param {String} options.message
 * @param {String} options.type
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
 export const deleteMessage = async options => {
     let {message,message_id,type,dispatch,done} = options;
     let {data} = await post('/api/delete-message',{message_id,message,type});
     
     if(data.success){
         dispatch(deleteMssg(message_id));
         done();
     }

     notify({ value: data.message})
 }









































































































