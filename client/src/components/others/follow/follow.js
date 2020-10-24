 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {follow} from '../../../utils/user-interact-utils';
 import PrimaryButton from '../button/primary-button';
 import {shape,number,string,func,bool} from 'prop-types';

/**
 * If there's no need to update store, then only provide user, username (within userDetails) & followed arguements.
 *
 * Provide firstname & surname when update_followings=true
 */
 const Follow = ({userDetails,followed,updateFollowings,updateFollowers,dispatch}) => {
     let {user,username,firstname,surname} = userDetails;

     let followUser = e => {
         e.preventDefault();
         let obj = {
              user,
              username,
              firstname,
              surname,
              dispatch,
              update_followings: updateFollowings,
              update_followers: updateFollowers,
              done: () => followed()
             };

         follow(obj);    
     }

     return (
         <Fragment>
             <PrimaryButton
                  label="Follow"
                  onClick={followUser}
                  extraClass="follow"
             />
         </Fragment>
     )
 }

 Follow.defaultProps = {
     updateFollowings: false,
     updateFollowers: false
 }

 Follow.propTypes = {
     userDetails: shape({
         user: number.isRequired,
         username: string.isRequired,
         firstname: string,
         surname: string
        }).isRequired,
     updateFollowings: bool,
     updateFollowers: bool,
     followed: func.isRequired   
 }

 export default connect()(Follow);























