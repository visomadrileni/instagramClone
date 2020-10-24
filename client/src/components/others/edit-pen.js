 import React from 'react';
 import ToolTip from 'react-tooltip';
 import AppLink from '../others/link/link';
 import MaterialIcon from './icons/material-icon';
 import {string,oneOf} from 'prop-types';

 const EditPen = ({to,when}) => (
     <div className="a_edit" style={{ display: 'none'}} data-tip={`Edit ${when}`}>
         <AppLink url={to}>
             <MaterialIcon icon="mode_edit" />
         </AppLink>

         <ToolTip />
     </div>
 )

  EditPen.propTypes = {
    to: string.isRequired,
    when: oneOf(['profile','group']).isRequired
  }

  export default EditPen;








