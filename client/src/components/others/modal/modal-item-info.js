 import React from 'react';
 import AppLink from '../link/link';
 import {shape,string} from 'prop-types';

 const ModalItemInfo = ({info}) => {
     let {username,firstname,surname} = info;

     return (
         <div className="modal_it_info">
             <AppLink
                url={`/profile/${username}`}
                className="modal_it_username"
                label={username}
             />
             <span className="modal_it_light">{`${firstname} ${surname}`}</span>
         </div>
     )
 } 

 ModalItemInfo.propTypes = {
     info: shape({
         username: string.isRequired,
         firstname: string.isRequired,
         surname: string.isRequired
        }).isRequired
 }

 export default ModalItemInfo;
























