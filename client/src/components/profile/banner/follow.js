 import React from 'react';
 import {connect} from 'react-redux';
 import {toggleFollow} from '../../../actions/follow';
 import {Me} from '../../../utils/utils';
 import AppLink from '../../others/link/link';
 import Follow from '../../others/follow/follow';
 import Unfollow from '../../others/follow/unfollow';

 const BannerFollow = ({user_details,isFollowing,dispatch}) => {
     let {id,username} = user_details;
     let user = id ? id : 0

     let toggle = what => dispatch(toggleFollow(what))

     return (
         <div className="pro_ff">
           {Me(id) ? (
              <AppLink url="/edit-profile" label="Edit profile" className="pri_btn ff" />
             ) : isFollowing ? (
              <Unfollow user={user} unfollowed={() => toggle(false)} updateFollowers />
             ) : (
               <Follow userDetails={{user,username}} followed={() => toggle(true)} updateFollowings />  
             )}
         </div>
     )
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     isFollowing: state.Follow.isFollowing
 })

 export default connect(mapStateToProps)(BannerFollow) 