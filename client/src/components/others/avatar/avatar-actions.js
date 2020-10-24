 import React from 'react';
 import {post} from 'axios';
 import {notify} from '../../../utils/utilMethods/handy-notification';
 import PrimaryButton from '../button/primary-button';
 import SecondaryButton from '../button/secondary-button';
 import {number,string,bool,oneOf, func} from 'prop-types';

 const AvatarActions = props => {
     let {loading,group,avatar,of,back} = props;

     let b = e => {
         e.preventDefault();
         back()
     }

     let chamgeAvatar = async e => {
         e.preventDefault();
         let {data: {success,message}} = await post('/api/change-avatar',{avatar,of,group})
         notify({
             value: message,
             done: () => (success ? window.location.reload() : null)
         })
     }

     return (
         <div className="pro_ava_bottom_act">
             <SecondaryButton label="Cancel" onClick={b} />
             <PrimaryButton label="Apply" onClick={chamgeAvatar} disabled={loading} extraClass="btn_select_avatar" />
         </div>
     )
 } 

 AvatarActions.propTypes = {
     loading: bool.isRequired,
     back: func.isRequired,
     avatar: string.isRequired,
     of: oneOf(['user','group']).isRequired,
     group: number
 }

 export default AvatarActions;