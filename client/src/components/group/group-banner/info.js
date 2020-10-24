 import React from 'react';
 import {connect} from 'react-redux';
 import AppLink from '../../others/link/link';
 import FAIcon from '../../others/icons/font-awesome-icon';
 
  const GroupInfo = ({group_details}) => {
       let {group_id,name,group_type} = group_details;

     return (
       <div className="pro_info">
           <div className="pro_username">
               <AppLink
                  url={`/group/${group_id}`}
                  label={name}
                  className="username"
               />
           </div>
           <div className="pro_name">
               {group_type === 'public' ? (
                   <span>
                       <FAIcon icon="globe" />Public Group
                   </span>
               ) : (
                   <span>
                       <FAIcon icon="lock" /> Private Group
                   </span>
               )}
           </div>
       </div>
     )
  }

  const mapStateToProps = state => ({
     group_details: state.Group.group_details
  })

  export default connect(mapStateToProps)(GroupInfo);
















