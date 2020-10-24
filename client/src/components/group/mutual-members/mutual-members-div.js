 import React from 'react';
 import {connect} from 'react-redux';
 import ToolTip from 'react-tooltip';
 import AppLink from '../../others/link/link';
 import FAIcon from '../../others/icons/font-awesome-icon';
 import {number} from 'prop-types';

 const MutualMembersDiv = ({ group,mutualMembers}) => {
     let map_mutuals = mutualMembers.map(m => (
         <AppLink 
              key={m.users}
              url={`/profile/${m.username}`}
              className="mutual_links"
              data-tip={m.username}
             >
            <img src={`/users/${m.user}/avatar.jpg`} />
         </AppLink>
     ));

    return (
          <div className="mutuals">
              <div className="mutual_info">
                  <span>Members you know</span>

                  <AppLink
                     url={`/group/${group}/members`}
                     className="view_all_yk"
                     data-tip="view all"
                  >
                      <FAIcon icon="chevron-right" />
                  </AppLink>
              </div>

              <div className="mutual_main">{map_mutuals}</div>
              <ToolTip />
          </div>
    )   
 }
 
 MutualMembersDiv.propTypes = {
     group: number.isRequired
 }

 const mapStateToprops = state => ({
     mutualMembers: state.Group.mutualMembers
 })

 export default connect(mapStateToprops)(MutualMembersDiv); 









