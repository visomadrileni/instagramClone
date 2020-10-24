 import React from 'react';
 import {connect} from 'react-redux';
 import ToolTip from 'react-tooltip';
 import AppLink from '../../others/link/link';
 import FAIcon from '../../others/link/link';
 import {number} from 'prop-types';

 const NewestMembersDiv = ({group,newestMembers}) => {
   let map_new_members = newestMembers.map(m => (
       <AppLink
          key={m.user}
          url={`/profile/${m.username}`}
          className="mutual_links"
          data-tip={m.username}>
           <img src={`/users/${m.user}/avatar.jpg`} />
       </AppLink>
   ))

   return (
       <div className="mutuals">
           <div className="mutual_info">
              <span>Neswest Members</span>

              <AppLink
                url={`/group/${group}/members`}
                className="view_all_yk"
                data-tip="view all">
                    <FAIcon icon="chevron-right" />
                </AppLink>
           </div>

           <div className="mutual_main">{map_new_members}</div>
           <ToolTip />
       </div>
   )
 }

 NewestMembersDiv.propTypes = {
    group: number
 }

 const mapStateToProps = state => ({
     newestMembers: state.Group.newestMembers
 })

 export default connect(mapStateToProps)(NewestMembersDiv)