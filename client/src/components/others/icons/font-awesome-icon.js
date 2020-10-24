 import React,{Fragment} from 'react';
 import classNames from 'classnames';
 import {string} from 'prop-types';
 
 const FAIcon = ({icon,...props}) => (
     <Fragment>
         <i className={classNames('fas',`fa-${icon}`)} {...props} />
     </Fragment>
 )

 FAIcon.propTypes = {
     icon: string.isRequired
 }

 export default FAIcon;





