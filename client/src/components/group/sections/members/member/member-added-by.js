 import React from 'react';
 import {Me} from '../../../../../utils/utils';
 import AppLink from '../../../../others/link/link';
 import {number,string,shape} from 'prop-types';

 const MemberAddedBy = ({memberDetails}) => {
   let {member,added_by,added_by_username} = memberDetails;

   return (
       <span className="recommend_by">
           {member !== added_by && (
               <div>
                   by{' '}
                   <AppLink
                      url={`/profile/${added_by_username}`}
                      label={Me(added_by) ? 'You' : added_by_username}
                   />
               </div>
           )}
       </span>
   )
 }

 MemberAddedBy.propTypes = {
     memberDetails: shape({
         member: number.isRequired,
         added_by: number.isRequired,
         added_by_username: string.isRequired
     }).isRequired
 }

 export default MemberAddedBy;