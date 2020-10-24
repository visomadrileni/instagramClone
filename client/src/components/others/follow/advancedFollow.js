 import React from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../utils/utils';
 import {follow} from '../../../utils/user-interact-utils';
 import PrimaryButton from '../../others/button/primary-button';
 import {number,string,func,shape} from 'prop-types';

 const AdvancedFollow = ({userDetails,followed,user_details,dispatch}) => {
    let {user,username,firstname,surname} = userDetails;
    let {id} = user_details;

    let followUser = e => {
        e.preventDefault();
        let profile_page = window.location.pathname.includes('/profile')
        let def = {
                     user,
                     username,
                     done: () => followed()
                  }
        let obj;

        if(!profile_page){
          obj = def
        } else if(profile_page){
         if(Me(id)){
             obj = {
                 ...def,
                 firstname,
                 surname,
                 dispatch,
                 update_followings: true
               }            
         } else if(user === id){
             obj = {
                 ...def,
                 dispatch,
                 update_followers: true
             } 
         } else {
             obj = def
         } 
      }

    follow(obj)
   }

  return (
        <PrimaryButton
            label="Follow"
            onClick={followUser}
            extraClass="follow"
        />
    )
 }
 AdvancedFollow.propTypes = {
     userDetails: shape({
         user: number.isRequired,
         username: string.isRequired,
         firstname: string.isRequired,
         surname: string.isRequired
        }).isRequired,
     followed: func.isRequired   
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(AdvancedFollow) 