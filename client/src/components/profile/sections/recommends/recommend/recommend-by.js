 import React from 'react';
 import AppLink from '../../../../others/link/link';
 import {string} from 'prop-types';

 const RecommendBy = ({username}) => (
     <span className="recommend_by">by
       <AppLink url={`/profile/${username}`} label={`${username}`} />
     </span>
 )

 RecommendBy.propTypes = {
     username: string.isRequired
 }

 export default RecommendBy;