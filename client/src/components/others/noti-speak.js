 import React from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {humanReadable} from '../../utils/utils';
 import {number} from 'prop-types';

 const NotiSpeak = ({unreadNotifications,session}) => {
     let {id,username} = session;

     return (
         <div>
             {unreadNotifications != 0 ? (
                 <div className="noti_speak">
                     <FadeIn duration="300ms">
                         <img src={`/users/${id}/avatar.jpg`} />
                         
                         <div className="n_s_sn_div">
                             <span>
                                 <b>@{username}</b>,you got {humanReadable(unreadNotifications,'notification')}
                             </span>
                         </div>
                     </FadeIn>
                 </div>
             ) : null }
         </div>
     )
 }
 
 NotiSpeak.propTypes = {
     unreadNotifications: number.isRequired
 }

 const mapStateToProps = state => ({
     session: state.User.session
 })

 export default connect(mapStateToProps)(NotiSpeak)