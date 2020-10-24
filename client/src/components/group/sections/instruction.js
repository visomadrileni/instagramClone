 import React,{Fragment} from 'react';
 import AppLink from '../others/link/link';
 import {bool} from 'prop-types';

 const GroupInstruction = ({showBtns}) => (
     <div className="sabout_one">
         <img src="/images/tree.png" />
         <div className="sabout_one_info">
             <span>Update or Edit group to make it look more attractive </span>
             {showBtns && (
                 <Fragment>
                     <AppLink url="/" className="sec_btn" label="Update Group" />
                     <AppLink url="/edit-profile" className="pri_btn" label="Edit Group" />
                 </Fragment>
             )}
         </div>
     </div>
 )

 GroupInstruction.defaultProps = {
     showBtns: true
 }

 GroupInstruction.propTypes = {
     showBtns: bool
 }

 export default GroupInstruction;