 import React from 'react';
 import {connect} from 'react-redux';
 import {humanReadable} from '../../../utils/utils';
 import {newConversation} from '../../../utils/message-utils';
 import AppLink from '../../others/link/link';
 import PrimaryButton from '../../others/button/primary-button';
 import {number,string,func} from 'prop-types';

 const OnlineUser = props => {
     let {user,username,firstname,surname,mutualUsersCount,back,dispatch} = props;

     let message = e => {
        e.preventDefault()
        newConversation({
            user,
            username,
            dispatch,
            done: () => back()
        })
     }

     return (
         <div className="modal_items fer_items">
             <div className="modal_it_img">
                 <img src={`/users/${user}/avatar.jpg`} alt="avatar" />
             </div>

             <div className="modal_it_content">
                 <div className="modal_it_info">
                     <AppLink
                        url={`/profile/${username}`}
                        className="modal_it_username"
                        label={username}
                     />

                     <span className="modal_it_light">
                         {mutualUsersCount === 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount,'mutual follower')}
                     </span>
                 </div>

                 <div className="modal_ff">
                     <PrimaryButton label="Message" onClick={message} />
                 </div>
             </div>
             <hr />
         </div>
     )
 }

 OnlineUser.propTypes = {
     user: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     mutualUsersCount: number.isRequired,
     back: func.isRequired
 }

 export default connect()(OnlineUser)
 export {OnlineUser as PureOnlineUser}