 import {dispatchHelper} from '../utils/utils';
 import {GET_NOTIFICATIONS,CLEAR_NOTIFICAIONS,GET_UNREAD_NOTIFICATIONS,READ_NOTIFICATIONS} from './types';

 export const getNotifications = () => dispatchHelper(GET_NOTIFICATIONS,'get-notifications');
 export const clearNotifications = () => dispatchHelper(CLEAR_NOTIFICAIONS,'clear-notifiactions');
 export const getUnreadNotifications = () => dispatchHelper(GET_UNREAD_NOTIFICATIONS,'get-unread-notifications');
 export const readNotifications = () => dispatchHelper(READ_NOTIFICATIONS,'read-notifications');
 


