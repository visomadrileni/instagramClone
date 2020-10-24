 import React,{Fragment} from 'react';
 import DeleteGroup from './deleteGroup';
 import ChangeGroupAdmin from './changeAdmin';
 import InviteToGroup from './invite';
 import CopyLink from '../../../others/copyLink';
 import {func} from 'prop-types';

 const GroupOptions = ({toggleOptions}) => {
    return (
         <Fragment>
            <ul>
                <InviteToGroup toggleOptions={toggleOptions} />
                <ChangeGroupAdmin toggleOptions={toggleOptions} />
                <DeleteGroup toggleOptions={toggleOptions} />
                <CopyLink
                    label="Copy group link"
                    url={window.location.href}
                    done={toggleOptions}  
                 />
            </ul>
         </Fragment>
     )
 }

 GroupOptions.propTypes = {
     toggleOptions: func.isRequired
 }

 export default GroupOptions;





































