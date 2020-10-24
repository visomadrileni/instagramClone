 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {unfollow} from '../../../utils/user-interact-utils';
 import PrimaryButton from '../button/primary-button';
 import {number,func,bool} from 'prop-types';

 /**
 * If there's no need to update store, then only provide user (within userDetails) & followed arguements.
 */
 const Unfollow = ({ user,unfollowed,updateFolowings,updateFollowers,dispatch}) => {
     let unfollowUser = e => {
         e.preventDefault();
         let obj = {
             user,
             dispatch,
             update_followings: updateFolowings,
             update_followers: updateFollowers,
             done: () => unfollowed()
           };

        unfollow(obj);   
     }

    return (
        <Fragment>
            <PrimaryButton
                label="Unfollow"
                onClick={unfollowUser}
                extraClass="unfollow"
            />
        </Fragment>
    ) 
 }

 Unfollow.defaultProps = {
    updateFolowings: false,
    updateFollowers: false
 }

 Unfollow.propTypes = {
     user: number.isRequired,
     unfollowed: func.isRequired,
     updateFolowings: bool,
     updateFollowers: bool
 }
 
 export default connect()(Unfollow);
































