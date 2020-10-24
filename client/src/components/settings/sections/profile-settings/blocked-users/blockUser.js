 import React from 'react';
 import {connect} from 'react-redux';
 import {unBlockUser} from '../../../../../utils/setting-utils';
 import {humanReadable} from '../../../../../utils/utils';
 import AppLink from '../../../../others/link/link';
 import SecondaryButton from '../../../../others/button/secondary-button';
 import {number,string} from 'prop-types';
 
 const BlockedUser = props => {
    let {block_id,user,username,firstname,surname,mutualFollowersCount,dispatch} = props;

    let unblockUser = e => {
        e.preventDefault()
        unBlockUser({block_id,username,dispatch})
    }

    return (
         <div className="blocked_users">
             <img src={`/users/${user}/avatar.jpg`} alt="avatar" />

             <div className="blocked_u_content">
                 <div className="blocked_info">
                     <AppLink url={`/profile/${username}`} className="blocked username" label={username} />
                     <span className="blocked_mutual">
                         {mutualFollowersCount === 0 ? `${firstname} ${surname}` : humanReadable(mutualFollowersCount,'mutual followers')}
                     </span>
                 </div>

                 <SecondaryButton label="Unblock" onClick={unblockUser} extraClass="unblock" />
             </div>
         </div>
    )
 }

 BlockedUser.propTypes = {
    block_id: number.isRequired,
    block_time: string.isRequired,
    user: number.isRequired,
    username: string.isRequired,
    firstname: string.isRequired,
    surname: string.isRequired,
    mutualFollowersCount: number.isRequired
 }


 export default connect()(BlockedUser)
 export {BlockedUser as PureBlockedUser}