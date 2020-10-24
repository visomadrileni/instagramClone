 import React,{Fragment} from 'react';
 import classNames from 'classnames';
 import {string} from 'prop-types';

 const SocialIconLink = ({value,label}) => (
     <Fragment>
         {value && (
             <a href={value} target="_blank">
                 <i className={classNames('fab',`fa-${label}`)} />
             </a>
         )}
     </Fragment>
 )

 SocialIconLink.propTypes = {
     value: string.isRequired,
     label: string.isRequired
 }
 
 export default SocialIconLink;