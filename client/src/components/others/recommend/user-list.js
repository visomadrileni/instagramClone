 import React from 'react';
 import {connect} from 'react-redux';
 import {recommendUser} from '../../../utils/user-interact-utils';
 import PrimaryButton from '../button/primary-button';
 import ModalItemInfo from '../modal/modal-item-info';
 import {number,string} from 'prop-types';

 const RecommendUsersList = props => {
     let {user_details,follow_to,username,firstname,surname,back} = props;

     let new_recommend = async e => {
         e.preventDefault();
         recommendUser({
             user: user_details.id,
             recommend_to: follow_to
         })
         back()
     }

     return (
         <div className="modal_items">
             <div className="modal_it_img">
                 <img src={`/users/${follow_to}/avatar.jpg`} alt="avatar"/>
             </div>

             <div className="modal_it_content">
                 <ModalItemInfo
                     info={{
                         username,
                         firstname,
                         surname
                     }}
                 />

                 <div className="modal_ff">
                     <PrimaryButton label="Recommend" onClick={new_recommend} />
                 </div>
             </div>
         </div>
     )
 }
 
 RecommendUsersList.propTypes = {
     follow_id: number.isRequired,
     follow_to: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired
  }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(RecommendUsersList)