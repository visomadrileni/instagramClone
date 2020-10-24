 import React,{Fragment} from 'react';
 import PrimaryButton from '../../others/button/primary-button';
 import SecondaryButton from '../../others/button/secondary-button';
 import {func,string} from 'prop-types';

 const CreateGroupActions = ({back,create,name}) => (
     <Fragment>
         <SecondaryButton label="Back" onClick={back} />
         <PrimaryButton 
           label="Create group"
           onClick={create}
           disabled={!name}
           extraClass="c_g_update"
         />
     </Fragment>
 )
 
 CreateGroupActions.propTypes = {
     back: func.isRequired,
     create: func.isRequired,
     name: string.isRequired
 }

 export default CreateGroupActions;















