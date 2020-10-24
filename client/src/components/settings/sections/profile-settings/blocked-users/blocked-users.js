 import React from 'react';
 import {connect} from 'react-redux';
 import BlockedUser from './blockUser';
 import Nothing from '../../../../others/nothing';

 const BlockedUsers = ({blockedUsers}) => {
    let map_users = blockedUsers.map(u => <BlockedUser key={u.block_id} {...u} />)

    return (
        <div className="blocking">
            <div className="set_header block_header">
                <span className="acc_type_h">Your blocked members</span>
            </div>
            {blockedUsers.length === 0 ? (
               <Nothing message="No blocked members" />
            ) : (
                map_users
            )}
        </div>
    )
 }

 const mapStateToProps = state => ({
     blockedUsers: state.Setting.blockedUsers
 })

 export default connect(mapStateToProps)(BlockedUsers)