 import React from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../utils/utils';
 import {unfollow} from '../../../utils/user-interact-utils';
 import PrimaryButton from '../button/primary-button';
 import {number,func} from 'prop-types';
 
 const AdvancedUnfollow = ({user,unfollowed,user_details,dispatch}) => {
       let {id} = user_details;

       let unfollowUser = e => {
           e.preventDefault();
           let profile_page = window.location.pathname.includes('/profile');
           let def = {user,done: () => unfollowed() }
           let obj;

           if(!profile_page){
               obj=def
           } else {
               if(Me(id)){
                   obj = { ...def,dispatch,update_followings: true}
               } else if(user === id){
                   obj = {...def,dispatch,update_followers:true}
               } else {
                   obj = def
               }
           }

           unfollow(obj)
       }

     return (
         <PrimaryButton
             label="Unfollow"
             onClick={unfollowUser}
             extraClass="unfollow"
         />
     )  
 }

 AdvancedUnfollow.propTypes = {
     user: number.isRequired,
     unfollowed: func.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(AdvancedUnfollow)