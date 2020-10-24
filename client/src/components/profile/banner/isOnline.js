 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../utils/utils';
 import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';

 const IsOnline = ({user_details}) => {
     let {id,isOnline,lastOnline} = user_details;

     return (
         <Fragment>
             {!Me(id) && isOnline && (
                 <span className="grp_admin user_online">
                     <span className="user_online_circle" />
                     <span>online</span>
                 </span>
             )}

             {!Me(id) && !isOnline && lastOnline && (
                 <span className="last_online">Last active {timeAgo(lastOnline)}</span>
             )}
         </Fragment>
     )
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(IsOnline)