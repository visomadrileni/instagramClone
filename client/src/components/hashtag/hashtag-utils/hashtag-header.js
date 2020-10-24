 import React from 'react';
 import {string} from 'prop-types'

 const HashtagHeader = ({text}) => (
     <div className="recomm_top">
         <span>{text}</span>
     </div>
 )

 HashtagHeader.propTypes = {
     text: string.isRequired
 }

 export default HashtagHeader;