 import React from 'react'
 import {connect} from 'react-redux';
 import {Me,humanReadable} from '../../../../../utils/utils';
 import AppLink from '../../../../others/link/link';
 import {number,string,shape} from 'prop-types';

 const MemberTop = ({memberDetails,group_details}) => {
    let {member,username,firstname,surname,mutualUsersCount} = memberDetails;
    let {admin} = group_details;

    return (
        <div className="m_top">
            <img src={`/users/${member}/avatar.jpg`} />

            <div className="m_top_right">
                <AppLink url={`/profile/${username}`} label={username} />
                {member == admin && <span className="grp_admin">admin</span>}

                <span>
                    {!Me(member) ? (mutualUsersCount == 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount,'mutual follower')) : `${firstname} ${surname}`}
                </span>
            </div>
        </div>
    )
 }

 MemberTop.propTypes = {
     memberDetails: shape({
         member: number.isRequired,
         username: string.isRequired,
         firstname: string.isRequired,
         surname: string.isRequired,
         mutualUsersCount: number.isRequired
       }).isRequired
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(MemberTop)