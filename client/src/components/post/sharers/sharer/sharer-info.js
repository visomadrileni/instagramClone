 import React from 'react';
 import {Me} from '../../../../utils/utils';
 import AppLink from '../../../others/link/link';
 import {number,string,shape} from 'prop-types';

 const SharerInfo = ({sharerDetails}) => {
     let {share_by,share_to,share_by_username,share_to_username} = sharerDetails;

     return (
         <div className="modal_it_info">
             <AppLink
                 url={`/profile/${share_by_username}`}
                 className="modal_it_username"
                 label={Me(share_by) ? 'You' : share_by_username}
             />
             <span className="modal_it_light">
                 to {Me(share_to) ? 'You' : share_to_username}
             </span>
         </div>
     )
 }

 SharerInfo.propTypes = {
     sharerDetails: shape({
         share_by: number.isRequired,
         share_to: number.isRequired,
         share_by_username: string.isRequired,
         share_to_username: string.isRequired
       }).isRequired
 }

 export default SharerInfo;